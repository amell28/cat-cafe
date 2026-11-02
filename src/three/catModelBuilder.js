import * as THREE from 'three';

// Procedural 3D Cat Generator with customizable breeds, animated joints, and accessories
export function createCatModel(catData) {
  const catGroup = new THREE.Group();
  catGroup.name = `cat_${catData.id}`;
  catGroup.userData = {
    id: catData.id,
    catData: { ...catData },
    isWalking: false,
    walkSpeed: 1.5,
    targetPosition: null,
    lookTarget: null,
    currentAction: 'idle',
    actionTimer: 0,
    legs: [],
    tailSegments: [],
    headGroup: null,
    accessoryGroup: null,
    accessoryId: catData.accessory || 'none',
    baseY: catData.spawnPos.y
  };

  // Materials based on cat fur patterns
  const mainColor = new THREE.Color(catData.colorHex);
  const secondaryColor = new THREE.Color(catData.secondaryHex);
  const bellyColor = new THREE.Color(catData.bellyHex || '#ffffff');
  const pinkInner = new THREE.Color('#f1948a');
  const eyeColor = new THREE.Color(catData.eyeColor || '#27ae60');

  const furMaterial = new THREE.MeshStandardMaterial({
    color: mainColor,
    roughness: 0.85,
    metalness: 0.05
  });

  const secondaryMaterial = new THREE.MeshStandardMaterial({
    color: secondaryColor,
    roughness: 0.85,
    metalness: 0.05
  });

  const bellyMaterial = new THREE.MeshStandardMaterial({
    color: bellyColor,
    roughness: 0.85,
    metalness: 0.05
  });

  const pinkMaterial = new THREE.MeshStandardMaterial({
    color: pinkInner,
    roughness: 0.5
  });

  const noseMaterial = new THREE.MeshStandardMaterial({
    color: 0xff6b81,
    roughness: 0.3
  });

  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: eyeColor,
    roughness: 0.1,
    metalness: 0.2
  });

  const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x050505 });
  const eyeHighlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // 1. Torso / Body (Chubby Cute Capsule / Rounded Box)
  const bodyGroup = new THREE.Group();
  const bodyGeo = new THREE.CapsuleGeometry(0.32, 0.55, 12, 16);
  bodyGeo.rotateX(Math.PI / 2); // Align horizontally
  const bodyMesh = new THREE.Mesh(bodyGeo, furMaterial);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  bodyGroup.add(bodyMesh);

  // Belly patch / bib
  if (catData.pattern === 'tuxedo' || catData.pattern === 'calico' || catData.pattern === 'tabby') {
    const bibGeo = new THREE.SphereGeometry(0.28, 12, 12);
    bibGeo.scale(0.85, 0.45, 1.1);
    const bibMesh = new THREE.Mesh(bibGeo, bellyMaterial);
    bibMesh.position.set(0, -0.09, 0.05);
    bibMesh.castShadow = true;
    bodyGroup.add(bibMesh);
  }

  // Tabby stripes or Calico patches on back
  if (catData.pattern === 'tabby') {
    for (let i = -0.18; i <= 0.18; i += 0.12) {
      const stripeGeo = new THREE.TorusGeometry(0.325, 0.022, 6, 16, Math.PI);
      stripeGeo.rotateX(Math.PI / 2);
      stripeGeo.rotateZ(Math.PI);
      const stripeMesh = new THREE.Mesh(stripeGeo, secondaryMaterial);
      stripeMesh.position.set(0, 0.05, i);
      bodyGroup.add(stripeMesh);
    }
  } else if (catData.pattern === 'calico') {
    // Calico decorative patches
    const patchGeo1 = new THREE.SphereGeometry(0.18, 8, 8);
    patchGeo1.scale(1.2, 0.5, 1.0);
    const patch1 = new THREE.Mesh(patchGeo1, secondaryMaterial);
    patch1.position.set(0.18, 0.15, -0.05);
    bodyGroup.add(patch1);

    const patchGeo2 = new THREE.SphereGeometry(0.15, 8, 8);
    patchGeo2.scale(1.0, 0.4, 0.8);
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.85 });
    const patch2 = new THREE.Mesh(patchGeo2, darkMaterial);
    patch2.position.set(-0.16, 0.18, 0.12);
    bodyGroup.add(patch2);
  }

  bodyGroup.position.set(0, 0.38, 0);
  catGroup.add(bodyGroup);
  catGroup.userData.bodyGroup = bodyGroup;

  // 2. Head Group (tiltable and look-target aware)
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.58, 0.42);

  // Rounded cute head
  const headGeo = new THREE.SphereGeometry(0.32, 16, 16);
  headGeo.scale(1.05, 0.95, 0.98);
  const headMesh = new THREE.Mesh(
    headGeo, 
    catData.pattern === 'siamese' ? secondaryMaterial : furMaterial
  );
  headMesh.castShadow = true;
  headMesh.receiveShadow = true;
  headGroup.add(headMesh);

  // Cute chubby cheeks
  const cheekGeo = new THREE.SphereGeometry(0.12, 10, 10);
  const leftCheek = new THREE.Mesh(cheekGeo, catData.pattern === 'tuxedo' ? bellyMaterial : furMaterial);
  leftCheek.position.set(0.14, -0.09, 0.22);
  leftCheek.scale.set(1.2, 0.9, 0.9);
  headGroup.add(leftCheek);

  const rightCheek = leftCheek.clone();
  rightCheek.position.x = -0.14;
  headGroup.add(rightCheek);

  // Cute pink nose
  const noseGeo = new THREE.ConeGeometry(0.045, 0.04, 4);
  noseGeo.rotateX(Math.PI / 2);
  noseGeo.rotateZ(Math.PI);
  const nose = new THREE.Mesh(noseGeo, noseMaterial);
  nose.position.set(0, -0.04, 0.32);
  headGroup.add(nose);

  // Whiskers (thin white/dark cylinders)
  const whiskerMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const whiskerGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.22);
  whiskerGeo.rotateZ(Math.PI / 2);

  [-1, 1].forEach((side) => {
    [-0.04, 0.02].forEach((yOffset, idx) => {
      const whisker = new THREE.Mesh(whiskerGeo, whiskerMat);
      whisker.position.set(side * 0.25, -0.06 + yOffset, 0.24);
      whisker.rotation.z = side * (0.12 - idx * 0.2);
      whisker.rotation.y = side * 0.25;
      headGroup.add(whisker);
    });
  });

  // Eyes (Big, expressive, cute anime-style cat eyes)
  [-0.13, 0.13].forEach((xPos) => {
    const eyeSclera = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 12, 12),
      eyeMaterial
    );
    eyeSclera.position.set(xPos, 0.04, 0.25);
    eyeSclera.scale.set(1, 1.15, 0.6);

    // Dark pupil (slit or round)
    const pupil = new THREE.Mesh(
      new THREE.SphereGeometry(0.052, 10, 10),
      pupilMaterial
    );
    pupil.position.set(0, 0, 0.048);
    pupil.scale.set(0.65, 0.95, 0.4);
    eyeSclera.add(pupil);

    // Shiny eye specular reflection
    const sparkle = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 6, 6),
      eyeHighlightMaterial
    );
    sparkle.position.set(0.02, 0.03, 0.07);
    eyeSclera.add(sparkle);

    headGroup.add(eyeSclera);
  });

  // Ears (Two cute triangular cones with pink inner shade)
  const ears = [];
  [-0.18, 0.18].forEach((xPos, idx) => {
    const earGroup = new THREE.Group();
    earGroup.position.set(xPos, 0.24, 0.02);
    earGroup.rotation.z = (idx === 0 ? 0.22 : -0.22);
    earGroup.rotation.x = -0.12;

    const earGeo = new THREE.ConeGeometry(0.12, 0.24, 4);
    earGeo.scale(0.85, 1, 0.45);
    const earOuter = new THREE.Mesh(
      earGeo, 
      (catData.pattern === 'siamese' || catData.pattern === 'tabby') ? secondaryMaterial : furMaterial
    );
    earOuter.castShadow = true;
    earGroup.add(earOuter);

    const earInnerGeo = new THREE.ConeGeometry(0.08, 0.18, 4);
    earInnerGeo.scale(0.8, 1, 0.35);
    const earInner = new THREE.Mesh(earInnerGeo, pinkMaterial);
    earInner.position.set(0, -0.02, 0.025);
    earGroup.add(earInner);

    headGroup.add(earGroup);
    ears.push(earGroup);
  });
  catGroup.userData.ears = ears;

  // Accessory Attachment Point
  const accessoryGroup = new THREE.Group();
  accessoryGroup.position.set(0, 0.28, 0.02);
  headGroup.add(accessoryGroup);
  catGroup.userData.accessoryGroup = accessoryGroup;

  catGroup.add(headGroup);
  catGroup.userData.headGroup = headGroup;

  // 3. Articulated Legs with Soft Paws
  const legPositions = [
    { name: 'frontLeft', x: 0.18, z: 0.22 },
    { name: 'frontRight', x: -0.18, z: 0.22 },
    { name: 'backLeft', x: 0.19, z: -0.22 },
    { name: 'backRight', x: -0.19, z: -0.22 }
  ];

  const legMaterial = (catData.pattern === 'tuxedo' || catData.pattern === 'calico') 
    ? bellyMaterial 
    : (catData.pattern === 'siamese' ? secondaryMaterial : furMaterial);

  legPositions.forEach((pos) => {
    const legJoint = new THREE.Group();
    legJoint.position.set(pos.x, 0.34, pos.z);

    const legUpper = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.055, 0.26, 8),
      legMaterial
    );
    legUpper.position.set(0, -0.13, 0);
    legUpper.castShadow = true;
    legJoint.add(legUpper);

    // Rounded Paw
    const pawMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 8, 8),
      bellyMaterial
    );
    pawMesh.scale.set(1.0, 0.65, 1.3);
    pawMesh.position.set(0, -0.26, 0.04);
    pawMesh.castShadow = true;
    legJoint.add(pawMesh);

    catGroup.add(legJoint);
    catGroup.userData.legs.push({ name: pos.name, group: legJoint });
  });

  // 4. Smooth Animated Wagging Tail
  const tailBaseGroup = new THREE.Group();
  tailBaseGroup.position.set(0, 0.42, -0.32);
  tailBaseGroup.rotation.x = -Math.PI / 4;

  let currentJoint = tailBaseGroup;
  const tailSegments = [];
  const segmentCount = 6;
  const tailMat = (catData.pattern === 'siamese' || catData.pattern === 'tabby') ? secondaryMaterial : furMaterial;

  for (let i = 0; i < segmentCount; i++) {
    const segGroup = new THREE.Group();
    if (i > 0) {
      segGroup.position.set(0, 0.1, 0.02);
    }
    const radius = 0.055 * (1 - i * 0.1);
    const segMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius * 0.85, radius, 0.11, 8),
      tailMat
    );
    segMesh.position.set(0, 0.055, 0);
    segMesh.castShadow = true;
    segGroup.add(segMesh);

    currentJoint.add(segGroup);
    currentJoint = segGroup;
    tailSegments.push(segGroup);
  }

  // Soft tail tip
  const tipMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 8, 8),
    tailMat
  );
  tipMesh.position.set(0, 0.11, 0);
  currentJoint.add(tipMesh);

  catGroup.add(tailBaseGroup);
  catGroup.userData.tailSegments = tailSegments;
  catGroup.userData.tailBase = tailBaseGroup;

  // Build the initial accessory
  attachAccessory(catGroup, catData.accessory || 'none');

  // Place at spawn position
  catGroup.position.set(catData.spawnPos.x, catData.spawnPos.y, catData.spawnPos.z);

  return catGroup;
}

// Function to attach or switch 3D accessories on the cat
export function attachAccessory(catGroup, accessoryId) {
  const accGroup = catGroup.userData.accessoryGroup;
  if (!accGroup) return;

  // Clear existing
  while (accGroup.children.length > 0) {
    accGroup.remove(accGroup.children[0]);
  }

  catGroup.userData.accessoryId = accessoryId;

  if (accessoryId === 'wizard_hat') {
    // Purple cone with gold band & star
    const hatGroup = new THREE.Group();
    const coneMat = new THREE.MeshStandardMaterial({ color: 0x6c3483, roughness: 0.4 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.7, roughness: 0.3 });

    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.02, 16), coneMat);
    hatGroup.add(brim);

    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.38, 16), coneMat);
    cone.position.set(0, 0.19, 0);
    cone.rotation.z = -0.15; // Cute slight bend
    hatGroup.add(cone);

    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.145, 0.04, 16), goldMat);
    band.position.set(0, 0.04, 0);
    hatGroup.add(band);

    // Tip star
    const star = new THREE.Mesh(new THREE.DodecahedronGeometry(0.04), goldMat);
    star.position.set(-0.06, 0.38, 0);
    hatGroup.add(star);

    hatGroup.position.set(0, 0.05, 0);
    hatGroup.rotation.x = -0.15;
    accGroup.add(hatGroup);
  } else if (accessoryId === 'party_hat') {
    // Striped party cone with fluffy pom-pom
    const hatGroup = new THREE.Group();
    const partyMat = new THREE.MeshStandardMaterial({ color: 0xff3838, roughness: 0.3 });
    const pomMat = new THREE.MeshStandardMaterial({ color: 0xfffa65, roughness: 0.9 });

    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.32, 16), partyMat);
    cone.position.set(0, 0.16, 0);
    hatGroup.add(cone);

    const pom = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), pomMat);
    pom.position.set(0, 0.33, 0);
    hatGroup.add(pom);

    hatGroup.position.set(0, 0.05, 0);
    hatGroup.rotation.x = -0.12;
    accGroup.add(hatGroup);
  } else if (accessoryId === 'chef_hat') {
    // Puffy white chef hat
    const hatGroup = new THREE.Group();
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });

    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.08, 16), whiteMat);
    band.position.set(0, 0.04, 0);
    hatGroup.add(band);

    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), whiteMat);
    puff.scale.set(1.1, 0.85, 1.1);
    puff.position.set(0, 0.16, 0);
    hatGroup.add(puff);

    hatGroup.position.set(0, 0.05, 0);
    accGroup.add(hatGroup);
  } else if (accessoryId === 'crown') {
    // Royal gold crown with gems
    const hatGroup = new THREE.Group();
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd32a, metalness: 0.8, roughness: 0.2 });
    const rubyMat = new THREE.MeshStandardMaterial({ color: 0xff3838, roughness: 0.1 });

    const crownBase = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.14, 0.08, 16, 1, true), goldMat);
    crownBase.position.set(0, 0.04, 0);
    hatGroup.add(crownBase);

    // Crown peaks
    const peakCount = 5;
    for (let i = 0; i < peakCount; i++) {
      const angle = (i / peakCount) * Math.PI * 2;
      const peak = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.08, 4), goldMat);
      peak.position.set(Math.cos(angle) * 0.14, 0.11, Math.sin(angle) * 0.14);
      hatGroup.add(peak);

      const gem = new THREE.Mesh(new THREE.SphereGeometry(0.016, 6, 6), rubyMat);
      gem.position.set(Math.cos(angle) * 0.14, 0.16, Math.sin(angle) * 0.14);
      hatGroup.add(gem);
    }

    hatGroup.position.set(0, 0.06, 0);
    accGroup.add(hatGroup);
  } else if (accessoryId === 'ribbon') {
    // Red bow tie on chest/neck
    const ribbonGroup = new THREE.Group();
    const redMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.4 });

    const center = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), redMat);
    ribbonGroup.add(center);

    const wingGeo = new THREE.ConeGeometry(0.06, 0.12, 4);
    wingGeo.rotateZ(Math.PI / 2);
    const leftWing = new THREE.Mesh(wingGeo, redMat);
    leftWing.position.set(0.08, 0, 0);
    ribbonGroup.add(leftWing);

    const rightWing = leftWing.clone();
    rightWing.position.set(-0.08, 0, 0);
    rightWing.rotation.z = Math.PI;
    ribbonGroup.add(rightWing);

    ribbonGroup.position.set(0, -0.32, 0.28);
    accGroup.add(ribbonGroup);
  } else if (accessoryId === 'glasses') {
    // Cool retro circular sunglasses
    const glassGroup = new THREE.Group();
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.7, roughness: 0.2 });
    const lensMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.1, transparent: true, opacity: 0.88 });

    [-0.13, 0.13].forEach((xPos) => {
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.012, 8, 16), frameMat);
      rim.position.set(xPos, 0, 0);
      glassGroup.add(rim);

      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), lensMat);
      lens.position.set(xPos, 0, 0.005);
      glassGroup.add(lens);
    });

    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.1), frameMat);
    bridge.rotateZ(Math.PI / 2);
    bridge.position.set(0, 0, 0);
    glassGroup.add(bridge);

    glassGroup.position.set(0, -0.22, 0.32);
    accGroup.add(glassGroup);
  }
}

// Update animations for a cat instance
export function updateCatAnimation(catGroup, delta, elapsedTime, laserTarget) {
  const data = catGroup.userData;
  if (!data) return;

  // Initialize tracking variables if not present
  if (data.pounceTimer === undefined) data.pounceTimer = 0;
  if (data.pounceCooldown === undefined) data.pounceCooldown = 0;
  if (data.pounceCooldown > 0) data.pounceCooldown -= delta;

  // Check distance to laser target
  const distToLaser = laserTarget ? catGroup.position.distanceTo(laserTarget) : Infinity;

  // 1. Idle breathing
  if (data.bodyGroup) {
    const breath = 1.0 + Math.sin(elapsedTime * 2.5 + catGroup.id) * 0.02;
    data.bodyGroup.scale.set(breath, breath, 1.0);
  }

  // 2. Tail wagging (fluid sin wave through segments)
  if (data.tailSegments && data.tailSegments.length > 0) {
    // When chasing laser or pouncing, tail wags much faster and more excitedly!
    const isExcited = data.isChasingLaser || (laserTarget && distToLaser < 7.0);
    const wagSpeed = data.pounceTimer > 0 ? 28 : isExcited ? 16 : data.isWalking ? 6 : 3;
    const wagAngle = Math.sin(elapsedTime * wagSpeed + catGroup.id) * (isExcited ? 0.45 : 0.25);
    data.tailSegments.forEach((seg, i) => {
      seg.rotation.y = wagAngle * (1 + i * 0.35);
      seg.rotation.z = Math.cos(elapsedTime * (isExcited ? 5 : 2) + i) * 0.05;
    });
  }

  // 3. Ear twitching occasionally (or alert ears forward when laser is active)
  if (data.ears && data.ears.length === 2) {
    if (laserTarget && distToLaser < 8.0) {
      // Alert forward perked ears
      data.ears[0].rotation.z = 0.12;
      data.ears[1].rotation.z = -0.12;
      data.ears[0].rotation.x = -0.15;
      data.ears[1].rotation.x = -0.15;
    } else {
      data.ears[0].rotation.x = 0;
      data.ears[1].rotation.x = 0;
      const twitch = Math.sin(elapsedTime * 0.8 + catGroup.id * 3);
      if (twitch > 0.94) {
        data.ears[0].rotation.z = 0.22 + (twitch - 0.94) * 3;
      } else {
        data.ears[0].rotation.z = 0.22;
      }
    }
  }

  // 4. Look target logic (Head tracks laser or points of interest)
  if (data.headGroup) {
    if (laserTarget && distToLaser < 10.0) {
      const localTarget = catGroup.worldToLocal(laserTarget.clone());
      const targetRotY = Math.max(-1.1, Math.min(1.1, Math.atan2(localTarget.x, localTarget.z)));
      const targetRotX = Math.max(-0.6, Math.min(0.6, -Math.atan2(localTarget.y - 0.58, localTarget.z)));
      // Snappier, eager head movement tracking the red dot
      data.headGroup.rotation.y += (targetRotY - data.headGroup.rotation.y) * 0.25;
      data.headGroup.rotation.x += (targetRotX - data.headGroup.rotation.x) * 0.25;
    } else {
      // Gentle head bobbing/looking around
      const idleYaw = Math.sin(elapsedTime * 0.6 + catGroup.id) * 0.15;
      data.headGroup.rotation.y += (idleYaw - data.headGroup.rotation.y) * 0.05;
      data.headGroup.rotation.x += (0 - data.headGroup.rotation.x) * 0.05;
    }
  }

  // 5. Laser Pounce Trigger
  if (laserTarget && data.isChasingLaser && distToLaser <= 0.65 && data.pounceCooldown <= 0) {
    data.pounceTimer = 0.55;
    data.pounceCooldown = 1.0;
    data.isChasingLaser = false;
    data.targetPosition = null;
    if (data.onPounceLaser) {
      data.onPounceLaser(catGroup);
    }
  }

  // 6. Walking / Movement to target position
  if (data.targetPosition && data.pounceTimer <= 0) {
    const currentPos = catGroup.position;
    const dir = new THREE.Vector3().subVectors(data.targetPosition, currentPos);
    dir.y = 0; // Keep horizontal
    const dist = dir.length();

    if (dist > 0.2) {
      data.isWalking = true;
      dir.normalize();

      // Smooth rotate towards destination
      const targetHeading = Math.atan2(dir.x, dir.z);
      let diff = targetHeading - catGroup.rotation.y;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      // Faster turning when chasing laser
      catGroup.rotation.y += diff * (data.isChasingLaser ? 0.22 : 0.1);

      // Move forward - sprint if chasing laser!
      const speedMultiplier = data.isChasingLaser ? (data.id === 'oyen' ? 2.8 : 2.2) : 1.0;
      catGroup.position.addScaledVector(dir, data.walkSpeed * speedMultiplier * delta);

      // Predatory crouch sprint tilt
      if (data.bodyGroup) {
        data.bodyGroup.rotation.x = data.isChasingLaser ? 0.12 : 0;
      }
    } else {
      data.isWalking = false;
      data.targetPosition = null;
      data.isChasingLaser = false;
      if (data.bodyGroup) data.bodyGroup.rotation.x = 0;
    }
  } else {
    data.isWalking = false;
    if (data.bodyGroup && data.pounceTimer <= 0) data.bodyGroup.rotation.x = 0;
  }

  // 7. Leg & Body Animation (Walking cycle vs Idle vs Pouncing)
  if (data.legs && data.legs.length === 4) {
    if (data.pounceTimer > 0) {
      // Pounce / Batting Paw Animation!
      data.pounceTimer -= delta;
      const p = 1.0 - Math.max(0, data.pounceTimer / 0.55); // 0 to 1
      const hop = Math.sin(p * Math.PI) * 0.28; // Arc hop into the air
      catGroup.position.y = data.baseY + hop;

      // Front paws playfully swipe at the laser dot
      const swatCycle = Math.sin(elapsedTime * 28);
      data.legs.forEach((legObj) => {
        if (legObj.name === 'frontLeft') {
          legObj.group.rotation.x = -0.85 + swatCycle * 0.35;
        } else if (legObj.name === 'frontRight') {
          legObj.group.rotation.x = -0.85 - swatCycle * 0.35;
        } else {
          // Back legs tucked for spring jump
          legObj.group.rotation.x = 0.5;
        }
      });
    } else if (data.isWalking) {
      const walkFreq = data.isChasingLaser ? 24 : 12;
      const walkCycle = Math.sin(elapsedTime * walkFreq);
      const legAmplitude = data.isChasingLaser ? 0.65 : 0.45;
      data.legs.forEach((legObj) => {
        if (legObj.name === 'frontLeft' || legObj.name === 'backRight') {
          legObj.group.rotation.x = walkCycle * legAmplitude;
        } else {
          legObj.group.rotation.x = -walkCycle * legAmplitude;
        }
      });
      // Vertical bounce
      const bounceHeight = data.isChasingLaser ? 0.07 : 0.04;
      catGroup.position.y = data.baseY + Math.abs(Math.sin(elapsedTime * walkFreq)) * bounceHeight;
    } else {
      // Reset legs to upright
      data.legs.forEach((legObj) => {
        legObj.group.rotation.x *= 0.85;
      });
      catGroup.position.y = THREE.MathUtils.lerp(catGroup.position.y, data.baseY, 0.15);
    }
  }
}
