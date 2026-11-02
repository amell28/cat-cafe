import * as THREE from 'three';

// Procedural 3D Environment Builder with City Skyline, City Lights, Building Rows, Swaying Trees, Wind & Rain
export function buildPetShopEnvironment(scene) {
  const envGroup = new THREE.Group();
  envGroup.name = 'petshop_environment';

  // ----------------------------------------------------
  // NEUTRAL AESTHETIC MATERIALS (Japandi / Scandinavian)
  // ----------------------------------------------------
  const woodFloorMat = new THREE.MeshStandardMaterial({
    color: 0xd7ccc8,
    roughness: 0.65,
    metalness: 0.02
  });

  const outdoorSidewalkMat = new THREE.MeshStandardMaterial({
    color: 0xd5d1cb,
    roughness: 0.88,
    metalness: 0.02
  });

  const parkGrassMat = new THREE.MeshStandardMaterial({
    color: 0x768f6b,
    roughness: 0.95
  });

  const streetAsphaltMat = new THREE.MeshStandardMaterial({
    color: 0x3d3a38,
    roughness: 0.85,
    metalness: 0.1
  });

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xf5f2eb,
    roughness: 0.75
  });

  const exteriorWallMat = new THREE.MeshStandardMaterial({
    color: 0xe8e4dc,
    roughness: 0.8
  });

  const townWallMat1 = new THREE.MeshStandardMaterial({ color: 0xdfd8cf, roughness: 0.8 }); // Warm sandstone
  const townWallMat2 = new THREE.MeshStandardMaterial({ color: 0xd7ccc8, roughness: 0.75 }); // Soft taupe brick
  const townWallMat3 = new THREE.MeshStandardMaterial({ color: 0xefebe9, roughness: 0.8 }); // Stucco cream
  const townWallMat4 = new THREE.MeshStandardMaterial({ color: 0xbcaaa4, roughness: 0.7 }); // Muted terracotta
  const adjacentWallMat = new THREE.MeshStandardMaterial({ color: 0xdfd9cf, roughness: 0.8 });

  const accentWoodMat = new THREE.MeshStandardMaterial({
    color: 0x8d6e63,
    roughness: 0.55
  });

  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xecdcc9,
    roughness: 0.6
  });

  const darkIronMat = new THREE.MeshStandardMaterial({
    color: 0x2e2b28,
    roughness: 0.4,
    metalness: 0.5
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
    roughness: 0.05,
    transmission: 0.75,
    ior: 1.5
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xc49a6c,
    metalness: 0.75,
    roughness: 0.3
  });

  // Glowing Window Materials for City Lights & Townhouses
  const windowGlowWarm = new THREE.MeshStandardMaterial({
    color: 0xfff3e0,
    emissive: 0xffd54f,
    emissiveIntensity: 1.2,
    roughness: 0.3
  });

  const windowGlowAmber = new THREE.MeshStandardMaterial({
    color: 0xffe0b2,
    emissive: 0xffb74d,
    emissiveIntensity: 1.3,
    roughness: 0.3
  });

  const windowGlowCyan = new THREE.MeshStandardMaterial({
    color: 0xe0f7fa,
    emissive: 0x80deea,
    emissiveIntensity: 1.0,
    roughness: 0.3
  });

  // ----------------------------------------------------
  // 1. MAIN CAFE BUILDING & INTERIOR
  // ----------------------------------------------------
  const interiorFloor = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.2, 8.4), woodFloorMat);
  interiorFloor.position.set(0, -0.1, -0.7);
  interiorFloor.receiveShadow = true;
  envGroup.add(interiorFloor);

  // Extended Sidewalk across entire city street
  const sidewalk = new THREE.Mesh(new THREE.BoxGeometry(60, 0.2, 5.4), outdoorSidewalkMat);
  sidewalk.position.set(0, -0.1, 6.2);
  sidewalk.receiveShadow = true;
  envGroup.add(sidewalk);

  const curb = new THREE.Mesh(
    new THREE.BoxGeometry(60, 0.12, 0.25),
    new THREE.MeshStandardMaterial({ color: 0x9e9891, roughness: 0.85 })
  );
  curb.position.set(0, 0.04, 8.9);
  envGroup.add(curb);

  // Road with Wet Sheen
  const road = new THREE.Mesh(new THREE.BoxGeometry(64, 0.1, 3.8), streetAsphaltMat);
  road.position.set(0, -0.12, 10.8);
  road.receiveShadow = true;
  envGroup.add(road);

  // Road Center Divider Lines
  for (let rl = -28; rl < 30; rl += 3.5) {
    const laneLine = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 0.12),
      new THREE.MeshBasicMaterial({ color: 0xf5f5f5 })
    );
    laneLine.rotation.x = -Math.PI / 2;
    laneLine.position.set(rl, -0.065, 10.8);
    envGroup.add(laneLine);
  }

  // Crosswalk Zebra Stripes
  for (let zs = -1.6; zs <= 1.6; zs += 0.45) {
    const stripe = new THREE.Mesh(
      new THREE.PlaneGeometry(0.28, 3.4),
      new THREE.MeshBasicMaterial({ color: 0xfafafa })
    );
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(zs, -0.065, 10.8);
    envGroup.add(stripe);
  }

  // Cafe Back & Side Walls
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(12, 5.5, 0.3), wallMat);
  backWall.position.set(0, 2.65, -4.9);
  envGroup.add(backWall);

  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 5.5, 8.4), wallMat);
  leftWall.position.set(-5.9, 2.65, -0.7);
  envGroup.add(leftWall);

  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 5.5, 8.4), wallMat);
  rightWall.position.set(5.9, 2.65, -0.7);
  envGroup.add(rightWall);

  // Cafe Front Facade
  const frontWallLeft = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5.5, 0.3), exteriorWallMat);
  frontWallLeft.position.set(-5.1, 2.65, 3.5);
  envGroup.add(frontWallLeft);

  const frontWallRight = new THREE.Mesh(new THREE.BoxGeometry(1.6, 5.5, 0.3), exteriorWallMat);
  frontWallRight.position.set(5.1, 2.65, 3.5);
  envGroup.add(frontWallRight);

  const frontHeader = new THREE.Mesh(new THREE.BoxGeometry(12, 1.8, 0.35), exteriorWallMat);
  frontHeader.position.set(0, 4.5, 3.5);
  envGroup.add(frontHeader);

  // Cafe Bay Windows
  [-2.8, 2.8].forEach((xPos) => {
    const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.7, 0.08), glassMat);
    windowFrame.position.set(xPos, 1.8, 3.5);
    envGroup.add(windowFrame);

    const windowSill = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 0.4), accentWoodMat);
    windowSill.position.set(xPos, 0.45, 3.5);
    envGroup.add(windowSill);
  });

  // ----------------------------------------------------
  // ENTRANCE DOORWAY (INTERACTIVE SWINGING FRONT DOOR)
  // ----------------------------------------------------
  // Static Wooden Outer Frame
  const doorFrameLeft = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.1, 0.22), accentWoodMat);
  doorFrameLeft.position.set(-0.85, 1.55, 3.5);
  envGroup.add(doorFrameLeft);

  const doorFrameRight = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.1, 0.22), accentWoodMat);
  doorFrameRight.position.set(0.85, 1.55, 3.5);
  envGroup.add(doorFrameRight);

  const doorFrameTop = new THREE.Mesh(new THREE.BoxGeometry(1.84, 0.16, 0.22), accentWoodMat);
  doorFrameTop.position.set(0, 3.02, 3.5);
  envGroup.add(doorFrameTop);

  const doorSill = new THREE.Mesh(new THREE.BoxGeometry(1.84, 0.05, 0.28), darkIronMat);
  doorSill.position.set(0, 0.025, 3.5);
  envGroup.add(doorSill);

  // Overhead Brass Cafe Bell (Tinkles when door opens)
  const bellMount = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.12), darkIronMat);
  bellMount.position.set(0, 2.92, 3.42);
  envGroup.add(bellMount);

  const bell = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.1, 10), brassMat);
  bell.position.set(0, 2.82, 3.42);
  envGroup.add(bell);

  // Door Pivot Group (Hinge on left side at X = -0.78, Z = 3.5)
  const doorPivot = new THREE.Group();
  doorPivot.position.set(-0.78, 0, 3.5);
  doorPivot.name = 'cafe_front_door';
  doorPivot.userData = { isDoor: true, isOpen: false };

  // Door Leaf Subgroup (offset by +0.76 in X relative to pivot)
  const doorLeaf = new THREE.Group();
  doorLeaf.position.set(0.76, 0, 0);
  doorLeaf.name = 'cafe_front_door';
  doorLeaf.userData = { isDoor: true };

  // Wooden outer frame of door leaf
  const doorStileLeft = new THREE.Mesh(new THREE.BoxGeometry(0.10, 2.85, 0.06), accentWoodMat);
  doorStileLeft.position.set(-0.69, 1.45, 0);
  doorStileLeft.userData = { isDoor: true };
  doorLeaf.add(doorStileLeft);

  const doorStileRight = new THREE.Mesh(new THREE.BoxGeometry(0.10, 2.85, 0.06), accentWoodMat);
  doorStileRight.position.set(0.69, 1.45, 0);
  doorStileRight.userData = { isDoor: true };
  doorLeaf.add(doorStileRight);

  const doorRailBottom = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.38, 0.06), accentWoodMat);
  doorRailBottom.position.set(0, 0.21, 0);
  doorRailBottom.userData = { isDoor: true };
  doorLeaf.add(doorRailBottom);

  const doorRailTop = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.16, 0.06), accentWoodMat);
  doorRailTop.position.set(0, 2.79, 0);
  doorRailTop.userData = { isDoor: true };
  doorLeaf.add(doorRailTop);

  const doorRailMid = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.10, 0.06), accentWoodMat);
  doorRailMid.position.set(0, 1.15, 0);
  doorRailMid.userData = { isDoor: true };
  doorLeaf.add(doorRailMid);

  // Large French Glass Insert
  const doorGlassPane = new THREE.Mesh(new THREE.BoxGeometry(1.28, 2.22, 0.025), glassMat);
  doorGlassPane.position.set(0, 1.62, 0);
  doorGlassPane.userData = { isDoor: true };
  doorLeaf.add(doorGlassPane);

  // Brass Door Pull Handle (both outer and inner)
  [-0.055, 0.055].forEach((handleZ) => {
    const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.65, 8), brassMat);
    handleBar.position.set(0.55, 1.35, handleZ);
    handleBar.userData = { isDoor: true };
    doorLeaf.add(handleBar);

    [-0.26, 0.26].forEach((postY) => {
      const handlePost = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.05, 6), brassMat);
      handlePost.rotation.x = Math.PI / 2;
      handlePost.position.set(0.55, 1.35 + postY, handleZ * 0.5);
      handlePost.userData = { isDoor: true };
      doorLeaf.add(handlePost);
    });
  });

  // Hanging "WELCOME • NEKO CAFE" Sign on Door Glass
  const welcomeSign = new THREE.Mesh(
    new THREE.BoxGeometry(0.48, 0.22, 0.015),
    new THREE.MeshStandardMaterial({ color: 0xf5f0eb, roughness: 0.6 })
  );
  welcomeSign.position.set(0, 1.72, 0.02);
  welcomeSign.userData = { isDoor: true };
  doorLeaf.add(welcomeSign);

  const welcomeSignText = new THREE.Mesh(
    new THREE.PlaneGeometry(0.40, 0.14),
    new THREE.MeshStandardMaterial({
      color: 0x3d352e,
      roughness: 0.8
    })
  );
  welcomeSignText.position.set(0, 1.72, 0.029);
  welcomeSignText.userData = { isDoor: true };
  doorLeaf.add(welcomeSignText);

  doorPivot.add(doorLeaf);
  envGroup.add(doorPivot);
  envGroup.userData.doorPivot = doorPivot;

  // Cafe Awning
  const awningWidth = 8.8;
  const awningDepth = 2.2;
  const awningMat1 = new THREE.MeshStandardMaterial({ color: 0x795548, roughness: 0.7 });
  const awningMat2 = new THREE.MeshStandardMaterial({ color: 0xf5f0eb, roughness: 0.7 });
  for (let s = 0; s < 12; s++) {
    const sMat = (s % 2 === 0) ? awningMat1 : awningMat2;
    const stripeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.71, 0.06, awningDepth), sMat);
    stripeMesh.position.set(-4.4 + (s + 0.5) * 0.73, 3.12, 4.6);
    stripeMesh.rotation.x = 0.28;
    envGroup.add(stripeMesh);
  }

  // Cafe Signboard
  const signBacking = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.9, 0.15), darkIronMat);
  signBacking.position.set(0, 4.5, 3.75);
  envGroup.add(signBacking);

  const neonMat = new THREE.MeshStandardMaterial({
    color: 0xecdcc9,
    emissive: 0xd7ccc8,
    emissiveIntensity: 0.8
  });
  const signLogoLeftEar = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.35, 4), neonMat);
  signLogoLeftEar.position.set(-2.4, 4.65, 3.85);
  envGroup.add(signLogoLeftEar);

  const signLogoRightEar = signLogoLeftEar.clone();
  signLogoRightEar.position.x = -1.9;
  envGroup.add(signLogoRightEar);

  const signPaw = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), neonMat);
  signPaw.position.set(-2.15, 4.35, 3.85);
  envGroup.add(signPaw);

  // ----------------------------------------------------
  // 2. DERETAN BANGUNAN DI SEBELAH KIRI (LEFT STREET ROW)
  // (X: -6.0 to -26.0)
  // ----------------------------------------------------
  // Building L1: "Botanical Florist & Plant Studio" (X: -10.5)
  const bldgL1 = new THREE.Group();
  bldgL1.position.set(-10.2, 0, 0);

  const l1Body = new THREE.Mesh(new THREE.BoxGeometry(7.8, 6.2, 7.5), townWallMat1);
  l1Body.position.set(0, 3.0, -0.25);
  l1Body.castShadow = true;
  bldgL1.add(l1Body);

  // Shop Window with Florist Green Awning
  const l1Awning = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 0.06, 1.8),
    new THREE.MeshStandardMaterial({ color: 0x4e6151, roughness: 0.6 }) // Sage forest green
  );
  l1Awning.position.set(-0.2, 3.2, 4.4);
  l1Awning.rotation.x = 0.28;
  bldgL1.add(l1Awning);

  const l1Window = new THREE.Mesh(new THREE.BoxGeometry(4.6, 2.6, 0.1), glassMat);
  l1Window.position.set(-0.2, 1.6, 3.55);
  bldgL1.add(l1Window);

  // 2nd Floor Glowing Windows
  [-1.6, 1.2].forEach((wx) => {
    const win = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.6, 0.05), windowGlowWarm);
    win.position.set(wx, 4.6, 3.52);
    bldgL1.add(win);
  });
  envGroup.add(bldgL1);

  // Building L2: "Boulangerie & Pâtisserie" (X: -17.5)
  const bldgL2 = new THREE.Group();
  bldgL2.position.set(-17.5, 0, 0);

  const l2Body = new THREE.Mesh(new THREE.BoxGeometry(6.5, 7.2, 7.5), townWallMat2);
  l2Body.position.set(0, 3.5, -0.25);
  bldgL2.add(l2Body);

  // Bakery Striped Canopy
  const l2Awning = new THREE.Mesh(
    new THREE.BoxGeometry(4.8, 0.06, 1.7),
    new THREE.MeshStandardMaterial({ color: 0xa1887f, roughness: 0.6 })
  );
  l2Awning.position.set(0, 3.2, 4.4);
  l2Awning.rotation.x = 0.28;
  bldgL2.add(l2Awning);

  // Upper Windows glowing
  [-1.2, 1.2].forEach((wx) => {
    [4.2, 5.8].forEach((wy) => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.2, 0.05), windowGlowAmber);
      win.position.set(wx, wy, 3.52);
      bldgL2.add(win);
    });
  });
  envGroup.add(bldgL2);

  // Building L3: "Classic European Brick Townhouse" (X: -23.5)
  const bldgL3 = new THREE.Group();
  bldgL3.position.set(-23.8, 0, 0);
  const l3Body = new THREE.Mesh(new THREE.BoxGeometry(6.0, 8.5, 7.5), townWallMat4);
  l3Body.position.set(0, 4.15, -0.25);
  bldgL3.add(l3Body);

  // Glowing grid windows
  [-1.4, 1.4].forEach((wx) => {
    [2.0, 4.0, 6.0, 7.5].forEach((wy) => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.2, 0.05), windowGlowWarm);
      win.position.set(wx, wy, 3.52);
      bldgL3.add(win);
    });
  });
  envGroup.add(bldgL3);

  // ----------------------------------------------------
  // 3. DERETAN BANGUNAN DI SEBELAH KANAN (RIGHT STREET ROW)
  // (X: 6.0 to 26.0)
  // ----------------------------------------------------
  // Building R1: "Neko Books & Cat Arcade" (X: 10.2)
  const adjGroup = new THREE.Group();
  adjGroup.position.set(10.2, 0, 0);

  const adjFloor = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.2, 7.5), woodFloorMat);
  adjFloor.position.set(0, -0.1, -0.25);
  adjGroup.add(adjFloor);

  const adjBody = new THREE.Mesh(new THREE.BoxGeometry(8.2, 6.2, 7.5), adjacentWallMat);
  adjBody.position.set(0, 3.0, -0.25);
  adjGroup.add(adjBody);

  const adjWindowFrame = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.8, 0.08), glassMat);
  adjWindowFrame.position.set(-0.8, 1.8, 3.5);
  adjGroup.add(adjWindowFrame);

  const adjSign = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 0.8, 0.15),
    new THREE.MeshStandardMaterial({ color: 0x3d4035, roughness: 0.6 })
  );
  adjSign.position.set(0, 4.5, 3.75);
  adjGroup.add(adjSign);

  const adjAwning = new THREE.Mesh(
    new THREE.BoxGeometry(5.4, 0.06, 1.8),
    new THREE.MeshStandardMaterial({ color: 0x5a6b5c, roughness: 0.7 })
  );
  adjAwning.position.set(0, 3.3, 4.4);
  adjAwning.rotation.x = 0.28;
  adjGroup.add(adjAwning);

  // Bookshelf inside
  const bookshelf = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.2, 3.0), new THREE.MeshStandardMaterial({ color: 0x6d4c41 }));
  bookshelf.position.set(-3.2, 1.6, -1.0);
  adjGroup.add(bookshelf);

  // Arcade machine
  const arcade = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.0, 0.9), new THREE.MeshStandardMaterial({ color: 0xc49a6c }));
  arcade.position.set(1.5, 1.0, -1.2);
  adjGroup.add(arcade);
  envGroup.add(adjGroup);

  // Building R2: "Artisan Ceramic & Craft Workshop" (X: 17.5)
  const bldgR2 = new THREE.Group();
  bldgR2.position.set(17.5, 0, 0);

  const r2Body = new THREE.Mesh(new THREE.BoxGeometry(6.4, 7.5, 7.5), townWallMat3);
  r2Body.position.set(0, 3.65, -0.25);
  bldgR2.add(r2Body);

  [-1.2, 1.2].forEach((wx) => {
    [2.0, 4.0, 5.8].forEach((wy) => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.2, 0.05), windowGlowWarm);
      win.position.set(wx, wy, 3.52);
      bldgR2.add(win);
    });
  });
  envGroup.add(bldgR2);

  // Building R3: "Modern City Apartments" (X: 23.8)
  const bldgR3 = new THREE.Group();
  bldgR3.position.set(23.8, 0, 0);

  const r3Body = new THREE.Mesh(new THREE.BoxGeometry(6.2, 8.8, 7.5), townWallMat1);
  r3Body.position.set(0, 4.3, -0.25);
  bldgR3.add(r3Body);

  [-1.3, 1.3].forEach((wx) => {
    [1.8, 3.6, 5.4, 7.2].forEach((wy) => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 0.05), (wy % 2 === 0 ? windowGlowCyan : windowGlowAmber));
      win.position.set(wx, wy, 3.52);
      bldgR3.add(win);
    });
  });
  envGroup.add(bldgR3);

  // ----------------------------------------------------
  // 4. CITY SKYLINE & CITY LIGHTS BACKDROP
  // (Z: -16.0 to -32.0, across X: -38 to +38)
  // ----------------------------------------------------
  const citySkylineGroup = new THREE.Group();
  citySkylineGroup.position.set(0, 0, -22);

  const skyscraperMat = new THREE.MeshStandardMaterial({
    color: 0x374151, // Slate dark modern high-rise
    roughness: 0.6,
    metalness: 0.3
  });

  const cityLights = [];
  const skyscraperConfigs = [
    { x: -32, h: 22, w: 6.0, d: 7.0 },
    { x: -25, h: 28, w: 7.5, d: 8.0 },
    { x: -18, h: 20, w: 6.5, d: 7.5 },
    { x: -11, h: 26, w: 7.0, d: 8.5 },
    { x: -4,  h: 24, w: 6.8, d: 8.0 },
    { x: 3,   h: 30, w: 7.8, d: 9.0 },
    { x: 10,  h: 23, w: 6.5, d: 8.0 },
    { x: 17,  h: 27, w: 7.2, d: 8.5 },
    { x: 24,  h: 21, w: 6.5, d: 7.5 },
    { x: 31,  h: 29, w: 7.5, d: 8.5 }
  ];

  skyscraperConfigs.forEach((sc, idx) => {
    const tower = new THREE.Mesh(
      new THREE.BoxGeometry(sc.w, sc.h, sc.d),
      skyscraperMat
    );
    tower.position.set(sc.x, sc.h / 2, 0);
    citySkylineGroup.add(tower);

    // Glowing City Window Grid
    const rows = Math.floor(sc.h / 2.2);
    const cols = Math.floor(sc.w / 1.8);
    for (let r = 1; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Randomly lit windows
        if (Math.random() < 0.72) {
          const glowMat = (r + c + idx) % 3 === 0 ? windowGlowWarm : ((r + c) % 2 === 0 ? windowGlowAmber : windowGlowCyan);
          const winLight = new THREE.Mesh(
            new THREE.PlaneGeometry(0.7, 0.9),
            glowMat
          );
          winLight.position.set(
            sc.x - (sc.w / 2) + 0.9 + c * 1.5,
            r * 2.2,
            sc.d / 2 + 0.05
          );
          citySkylineGroup.add(winLight);
          cityLights.push(winLight);
        }
      }
    }

    // Red Blinking Aviation Warning Beacons on top of skyscrapers
    if (sc.h >= 24) {
      const beacon = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0xff3838 })
      );
      beacon.position.set(sc.x, sc.h + 0.4, 0);
      citySkylineGroup.add(beacon);
    }
  });

  envGroup.add(citySkylineGroup);
  envGroup.userData.cityLights = cityLights;

  // ----------------------------------------------------
  // 5. TAMAN DI DEPAN CAFE (FRONT PARK & GARDEN)
  // (Z: 12.8 to 20.5)
  // ----------------------------------------------------
  const parkGroup = new THREE.Group();
  parkGroup.position.set(0, 0, 16.5);

  const parkLawn = new THREE.Mesh(new THREE.BoxGeometry(32, 0.2, 7.5), parkGrassMat);
  parkLawn.position.set(0, -0.09, 0);
  parkLawn.receiveShadow = true;
  parkGroup.add(parkLawn);

  // Stepping Stone Path
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0xd7ccc8, roughness: 0.9 });
  [
    { x: 0.0, z: -3.5 },
    { x: -1.2, z: -2.4 },
    { x: -2.2, z: -1.2 },
    { x: -3.0, z: 0.0 },
    { x: -2.0, z: 1.2 },
    { x: -0.5, z: 2.2 },
    { x: 1.5, z: 2.8 }
  ].forEach((pt) => {
    const stone = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.48, 0.04, 10), stoneMat);
    stone.position.set(pt.x, 0.03, pt.z);
    parkGroup.add(stone);
  });

  // ----------------------------------------------------
  // 6. SWAYING TREES IN WIND (PARK TREES & STREET TREES)
  // ----------------------------------------------------
  const swayingTrees = [];
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 });
  const foliageMat1 = new THREE.MeshStandardMaterial({ color: 0x6e8b6b, roughness: 0.85 });
  const foliageMat2 = new THREE.MeshStandardMaterial({ color: 0x859b7a, roughness: 0.85 });

  // 8 Trees along the park and sidewalk
  const treeConfigs = [
    { x: -8.5, z: -1.5, inPark: true },
    { x: -4.5, z: 1.8, inPark: true },
    { x: 5.5, z: -1.2, inPark: true },
    { x: 8.5, z: 1.5, inPark: true },
    { x: -13.5, z: 7.2, inPark: false },
    { x: -20.5, z: 7.2, inPark: false },
    { x: 14.2, z: 7.2, inPark: false },
    { x: 21.5, z: 7.2, inPark: false }
  ];

  treeConfigs.forEach((tc, idx) => {
    const treeGroup = new THREE.Group();
    if (tc.inPark) {
      treeGroup.position.set(tc.x, 0, tc.z);
    } else {
      treeGroup.position.set(tc.x, 0, tc.z);
    }

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.26, 2.4, 8), trunkMat);
    trunk.position.y = 1.2;
    treeGroup.add(trunk);

    // Articulated Swaying Foliage Group
    const foliageGroup = new THREE.Group();
    foliageGroup.position.y = 2.4;

    const fMat = idx % 2 === 0 ? foliageMat1 : foliageMat2;
    const foliage1 = new THREE.Mesh(new THREE.SphereGeometry(1.25, 10, 10), fMat);
    foliage1.scale.set(1.2, 0.9, 1.2);
    foliageGroup.add(foliage1);

    const foliage2 = new THREE.Mesh(new THREE.SphereGeometry(0.95, 8, 8), fMat);
    foliage2.position.set(0.3, 0.9, -0.2);
    foliageGroup.add(foliage2);

    treeGroup.add(foliageGroup);

    treeGroup.userData = {
      foliageGroup,
      swayOffset: idx * 0.7,
      swaySpeed: 2.2 + (idx % 3) * 0.4
    };

    if (tc.inPark) {
      parkGroup.add(treeGroup);
    } else {
      envGroup.add(treeGroup);
    }
    swayingTrees.push(treeGroup);
  });
  envGroup.add(parkGroup);
  envGroup.userData.swayingTrees = swayingTrees;

  // ----------------------------------------------------
  // 7. BLOWING WIND LEAVES / SWIRLING PARTICLES
  // ----------------------------------------------------
  const leafCount = 100;
  const leafGeo = new THREE.BufferGeometry();
  const leafPositions = new Float32Array(leafCount * 3);
  for (let l = 0; l < leafCount * 3; l += 3) {
    leafPositions[l] = (Math.random() - 0.5) * 36;
    leafPositions[l + 1] = 0.5 + Math.random() * 6;
    leafPositions[l + 2] = 2 + Math.random() * 18;
  }
  leafGeo.setAttribute('position', new THREE.BufferAttribute(leafPositions, 3));
  const leafMat = new THREE.PointsMaterial({
    color: 0xc49a6c, // Golden-sage autumn breeze leaves
    size: 0.12,
    transparent: true,
    opacity: 0.8
  });
  const leafSystem = new THREE.Points(leafGeo, leafMat);
  envGroup.add(leafSystem);
  envGroup.userData.leafSystem = leafSystem;

  // ----------------------------------------------------
  // 8. MOVING 3D VEHICLES (CARS & SCOOTERS)
  // ----------------------------------------------------
  const vehicles = [];
  const carGroup = new THREE.Group();
  carGroup.position.set(-16, 0, 10.0);
  const carBodyMat = new THREE.MeshStandardMaterial({ color: 0xd7ccc8, roughness: 0.35, metalness: 0.2 });
  const carWindowMat = new THREE.MeshStandardMaterial({ color: 0x222f3e, roughness: 0.1 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.8 });

  const carLower = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.55, 1.3), carBodyMat);
  carLower.position.y = 0.45;
  carLower.castShadow = true;
  carGroup.add(carLower);

  const carCabin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 1.15), carWindowMat);
  carCabin.position.set(-0.2, 0.9, 0);
  carGroup.add(carCabin);

  const carWheels = [];
  [-0.85, 0.85].forEach((wx) => {
    [-0.68, 0.68].forEach((wz) => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.14, 12), wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(wx, 0.24, wz);
      carGroup.add(wheel);
      carWheels.push(wheel);
    });
  });

  const headlightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff9e6, emissiveIntensity: 1.5 });
  [-0.45, 0.45].forEach((hz) => {
    const headlight = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), headlightMat);
    headlight.position.set(1.4, 0.45, hz);
    carGroup.add(headlight);
  });

  carGroup.userData = { speed: 3.8, minX: -26, maxX: 28, wheels: carWheels, direction: 1 };
  envGroup.add(carGroup);
  vehicles.push(carGroup);

  // Classic Scooter
  const scooterGroup = new THREE.Group();
  scooterGroup.position.set(16, 0, 11.5);
  scooterGroup.rotation.y = Math.PI;

  const scooterMat = new THREE.MeshStandardMaterial({ color: 0x7e8c7c, roughness: 0.4 });
  const scooterBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.35, 0.4), scooterMat);
  scooterBody.position.y = 0.35;
  scooterGroup.add(scooterBody);

  const scooterWheels = [];
  [-0.55, 0.55].forEach((wx) => {
    const swheel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.1, 10), wheelMat);
    swheel.rotation.x = Math.PI / 2;
    swheel.position.set(wx, 0.18, 0);
    scooterGroup.add(swheel);
    scooterWheels.push(swheel);
  });

  const riderBody = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.6, 8), new THREE.MeshStandardMaterial({ color: 0x4a443e }));
  riderBody.position.set(-0.1, 0.82, 0);
  scooterGroup.add(riderBody);

  const riderHelmet = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), new THREE.MeshStandardMaterial({ color: 0xf5f5f5 }));
  riderHelmet.position.set(-0.1, 1.25, 0);
  scooterGroup.add(riderHelmet);

  const sHeadlight = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), headlightMat);
  sHeadlight.position.set(0.7, 0.75, 0);
  scooterGroup.add(sHeadlight);

  scooterGroup.userData = { speed: 4.4, minX: -26, maxX: 28, wheels: scooterWheels, direction: -1 };
  envGroup.add(scooterGroup);
  vehicles.push(scooterGroup);

  envGroup.userData.vehicles = vehicles;

  // ----------------------------------------------------
  // 9. ANIMATED HUMANS (PEDESTRIANS)
  // ----------------------------------------------------
  const humans = [];
  function createHuman(config) {
    const humanGroup = new THREE.Group();
    humanGroup.position.set(config.x, 0, config.z);

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xf5d0b5, roughness: 0.7 });
    const clothesMat = new THREE.MeshStandardMaterial({ color: config.shirtColor, roughness: 0.8 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: config.pantsColor, roughness: 0.8 });

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.58, 0.22), clothesMat);
    torso.position.y = 1.05;
    torso.castShadow = true;
    humanGroup.add(torso);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 10), skinMat);
    head.position.y = 1.48;
    humanGroup.add(head);

    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.65, 0.16), pantsMat);
    leftLeg.position.set(0.11, 0.42, 0);
    humanGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.65, 0.16), pantsMat);
    rightLeg.position.set(-0.11, 0.42, 0);
    humanGroup.add(rightLeg);

    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.12), clothesMat);
    leftArm.position.set(0.24, 1.0, 0);
    humanGroup.add(leftArm);

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.12), clothesMat);
    rightArm.position.set(-0.24, 1.0, 0);
    humanGroup.add(rightArm);

    // Umbrella
    const umbrellaGroup = new THREE.Group();
    umbrellaGroup.position.set(0.25, 1.25, 0.1);
    const uPole = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.8), darkIronMat);
    uPole.position.y = 0.4;
    umbrellaGroup.add(uPole);
    const uCanopy = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.35, 10), new THREE.MeshStandardMaterial({ color: config.umbrellaColor || 0xc49a6c }));
    uCanopy.position.y = 0.8;
    umbrellaGroup.add(uCanopy);
    umbrellaGroup.visible = false;
    humanGroup.add(umbrellaGroup);

    humanGroup.userData = {
      leftLeg,
      rightLeg,
      leftArm,
      rightArm,
      umbrellaGroup,
      pathMinX: config.pathMinX,
      pathMaxX: config.pathMaxX,
      speed: config.speed,
      direction: config.direction || 1,
      walkCycleOffset: Math.random() * 10
    };

    envGroup.add(humanGroup);
    humans.push(humanGroup);
  }

  createHuman({ x: -3.0, z: 5.5, shirtColor: 0x5d4037, pantsColor: 0x37474f, umbrellaColor: 0x7e8c7c, pathMinX: -14.0, pathMaxX: 12.0, speed: 1.2, direction: 1 });
  createHuman({ x: 5.0, z: 7.2, shirtColor: 0xb08968, pantsColor: 0x263238, umbrellaColor: 0x8d6e63, pathMinX: -12.0, pathMaxX: 15.0, speed: 1.0, direction: -1 });
  createHuman({ x: 1.0, z: 15.0, shirtColor: 0x78909c, pantsColor: 0x455a64, umbrellaColor: 0x607d67, pathMinX: -6.0, pathMaxX: 6.0, speed: 0.8, direction: 1 });
  envGroup.userData.humans = humans;

  // ----------------------------------------------------
  // 10. WIND-BLOWN RAIN PARTICLE SYSTEM
  // ----------------------------------------------------
  const rainCount = 2200;
  const rainGeo = new THREE.BufferGeometry();
  const rainPositions = new Float32Array(rainCount * 3);
  for (let r = 0; r < rainCount * 3; r += 3) {
    rainPositions[r] = (Math.random() - 0.5) * 44;
    rainPositions[r + 1] = Math.random() * 16;
    rainPositions[r + 2] = -6 + Math.random() * 30;
  }
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rainMat = new THREE.PointsMaterial({
    color: 0xbbdefb,
    size: 0.08,
    transparent: true,
    opacity: 0.75
  });
  const rainSystem = new THREE.Points(rainGeo, rainMat);
  rainSystem.visible = false;
  envGroup.add(rainSystem);
  envGroup.userData.rainSystem = rainSystem;

  // ----------------------------------------------------
  // 11. TWINKLING STARS & CLOUDS & MOON
  // ----------------------------------------------------
  const starCount = 800;
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  for (let s = 0; s < starCount * 3; s += 3) {
    starPositions[s] = (Math.random() - 0.5) * 90;
    starPositions[s + 1] = 8 + Math.random() * 40;
    starPositions[s + 2] = -30 + (Math.random() - 0.5) * 40;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starSystem = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.14, transparent: true, opacity: 0.85 }));
  starSystem.visible = false;
  envGroup.add(starSystem);
  envGroup.userData.starSystem = starSystem;

  const moonGroup = new THREE.Group();
  moonGroup.position.set(-16, 24, -22);
  const moonMesh = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16), new THREE.MeshStandardMaterial({ color: 0xfffae6, emissive: 0xfff9e6, emissiveIntensity: 0.9 }));
  moonGroup.add(moonMesh);
  moonGroup.visible = false;
  envGroup.add(moonGroup);
  envGroup.userData.moonGroup = moonGroup;

  const cloudsGroup = new THREE.Group();
  const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, transparent: true, opacity: 0.85 });
  for (let c = 0; c < 6; c++) {
    const cloud = new THREE.Group();
    cloud.position.set(-24 + c * 10, 16 + (c % 2) * 2, -12 + (c % 3) * 4);
    for (let p = 0; p < 4; p++) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(1.2 + Math.random() * 0.5, 8, 8), cloudMat);
      puff.position.set(p * 1.0, (p % 2) * 0.4, (Math.random() - 0.5) * 0.6);
      cloud.add(puff);
    }
    cloudsGroup.add(cloud);
  }
  envGroup.add(cloudsGroup);
  envGroup.userData.cloudsGroup = cloudsGroup;

  // Street Lamps
  [-6.5, 5.2, 16.5].forEach((lx) => {
    const streetLamp = new THREE.Group();
    streetLamp.position.set(lx, 0, 7.8);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 3.8, 8), darkIronMat);
    pole.position.y = 2.1;
    streetLamp.add(pole);

    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.42, 6), new THREE.MeshStandardMaterial({ color: 0xfffae6, emissive: 0xffd32a, emissiveIntensity: 1.2, transparent: true, opacity: 0.95 }));
    lantern.position.y = 4.1;
    streetLamp.add(lantern);

    const pLight = new THREE.PointLight(0xffd32a, 1.8, 10);
    pLight.position.y = 4.1;
    streetLamp.add(pLight);
    envGroup.add(streetLamp);
  });

  // Cafe Interior Features
  const catTreeGroup = new THREE.Group();
  catTreeGroup.position.set(-3.2, 0, -2.8);
  const treeBase = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 2.0), new THREE.MeshStandardMaterial({ color: 0xf5f2eb }));
  treeBase.position.y = 0.06;
  catTreeGroup.add(treeBase);
  const pole1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.3, 16), new THREE.MeshStandardMaterial({ color: 0xd7ccc8 }));
  pole1.position.y = 1.15;
  catTreeGroup.add(pole1);
  const topPerch = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.1, 16), new THREE.MeshStandardMaterial({ color: 0xf5f2eb }));
  topPerch.position.set(0, 2.3, 0);
  catTreeGroup.add(topPerch);
  envGroup.add(catTreeGroup);

  // Mochi's Cozy Lounge Donut Bed (Placed comfortably in warm quiet corner)
  const bedGroup = new THREE.Group();
  bedGroup.position.set(2.8, 0, -3.2);
  const bedRim = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.22, 12, 24), new THREE.MeshStandardMaterial({ color: 0xefebe9 }));
  bedRim.rotation.x = Math.PI / 2;
  bedRim.position.y = 0.2;
  bedGroup.add(bedRim);
  envGroup.add(bedGroup);

  const spaGroup = new THREE.Group();
  spaGroup.position.set(-4.0, 0, 1.5);
  spaGroup.rotation.y = Math.PI / 4;
  const tub = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.65, 0.9), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 }));
  tub.position.y = 0.45;
  spaGroup.add(tub);
  envGroup.add(spaGroup);

  // ----------------------------------------------------
  // SPECIALTY CAT CAFE BAR COUNTER & COFFEE BARISTA STATION
  // (Bar Mewah & Tempat Bikin Kopi)
  // ----------------------------------------------------
  const barGroup = new THREE.Group();
  barGroup.position.set(3.3, 0, 0.2);

  const marbleCounterMat = new THREE.MeshStandardMaterial({
    color: 0xfcfbfa,
    roughness: 0.22,
    metalness: 0.05
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xdedede,
    roughness: 0.18,
    metalness: 0.88
  });

  const coffeeBeanMat = new THREE.MeshStandardMaterial({
    color: 0x3e2723,
    roughness: 0.85
  });

  const pastryMat = new THREE.MeshStandardMaterial({
    color: 0xdf9857,
    roughness: 0.75
  });

  // 1. Bar Counter Plinth Base
  const barBase = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.92, 4.3), accentWoodMat);
  barBase.position.y = 0.46;
  barGroup.add(barBase);

  // Front Fluted Slats (Japandi vertical wooden batten detailing)
  for (let s = -2.0; s <= 2.0; s += 0.22) {
    const slat = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.88, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.6 })
    );
    slat.position.set(-0.58, 0.46, s);
    barGroup.add(slat);
  }

  // Polished Calacatta Marble Countertop
  const barTop = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.08, 4.45), marbleCounterMat);
  barTop.position.y = 0.96;
  barGroup.add(barTop);

  // Cozy Under-Counter Warm LED Glow
  const barUnderLight = new THREE.PointLight(0xffb74d, 1.2, 4.2);
  barUnderLight.position.set(-0.65, 0.82, 0);
  barGroup.add(barUnderLight);

  // 2. Three Japandi Bar Stools with Boucle Cushions
  [-1.2, 0.0, 1.2].forEach((stoolZ) => {
    const stool = new THREE.Group();
    stool.position.set(-1.45, 0, stoolZ);

    // Round soft cream cushion
    const seat = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.10, 18),
      new THREE.MeshStandardMaterial({ color: 0xf5f0eb, roughness: 0.85 })
    );
    seat.position.y = 0.68;
    stool.add(seat);

    // Slim iron legs
    [-0.14, 0.14].forEach((lx) => {
      [-0.14, 0.14].forEach((lz) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.68, 6), darkIronMat);
        leg.position.set(lx, 0.34, lz);
        stool.add(leg);
      });
    });

    // Footrest ring
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.012, 6, 16), darkIronMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.25;
    stool.add(ring);

    barGroup.add(stool);
  });

  // 3. Professional Dual-Group Espresso Machine (Tempat Bikin Kopi)
  const espressoGroup = new THREE.Group();
  espressoGroup.position.set(0.05, 1.0, -0.3);
  espressoGroup.name = 'espresso_machine';
  espressoGroup.userData = { isCoffeeMachine: true };

  // Main chassis (Vintage cream & polished steel)
  const espBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.52, 0.62),
    new THREE.MeshStandardMaterial({ color: 0xf5ede3, roughness: 0.35 })
  );
  espBody.position.y = 0.26;
  espBody.name = 'espresso_machine';
  espBody.userData = { isCoffeeMachine: true };
  espressoGroup.add(espBody);

  // Cup warmer top tray with brass guard rail
  const espTopRail = new THREE.Mesh(new THREE.BoxGeometry(0.80, 0.04, 0.55), chromeMat);
  espTopRail.position.y = 0.54;
  espTopRail.name = 'espresso_machine';
  espressoGroup.add(espTopRail);

  // Stack of ceramic cups on warmer
  [-0.22, 0.0, 0.22].forEach((cx) => {
    const demitasse = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.03, 0.055, 10),
      new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3 })
    );
    demitasse.position.set(cx, 0.58, 0);
    espressoGroup.add(demitasse);
  });

  // 2 Chrome Groupheads with Portafilters pointing forward
  [-0.18, 0.18].forEach((gx) => {
    const groupHead = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.08, 12), chromeMat);
    groupHead.position.set(gx, 0.28, -0.33);
    espressoGroup.add(groupHead);

    // Portafilter handle pointing towards barista/room
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.22, 8), darkIronMat);
    handle.rotation.x = Math.PI / 2;
    handle.position.set(gx, 0.26, -0.46);
    espressoGroup.add(handle);

    // Dual spout
    const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.05, 6), chromeMat);
    spout.position.set(gx, 0.22, -0.33);
    espressoGroup.add(spout);
  });

  // Chrome Steam Wand into Milk Frothing Pitcher
  const steamWand = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.28, 6), chromeMat);
  steamWand.position.set(-0.38, 0.24, -0.28);
  steamWand.rotation.z = 0.35;
  espressoGroup.add(steamWand);

  const milkPitcher = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.05, 0.12, 12),
    chromeMat
  );
  milkPitcher.position.set(-0.44, 0.06, -0.28);
  espressoGroup.add(milkPitcher);

  // Pressure Gauges (Round dial manometers on front)
  [-0.1, 0.1].forEach((px) => {
    const gauge = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.02, 12), brassMat);
    gauge.rotation.x = Math.PI / 2;
    gauge.position.set(px, 0.40, -0.32);
    espressoGroup.add(gauge);
  });

  // Drip tray grill
  const dripTray = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.03, 0.25), chromeMat);
  dripTray.position.set(0, 0.015, -0.36);
  espressoGroup.add(dripTray);

  barGroup.add(espressoGroup);
  envGroup.userData.espressoPos = new THREE.Vector3(3.35, 1.35, -0.1);

  // 4. Commercial Coffee Bean Grinder
  const grinderGroup = new THREE.Group();
  grinderGroup.position.set(0.05, 1.0, -1.05);

  const grinderBase = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.34, 0.30), darkIronMat);
  grinderBase.position.y = 0.17;
  grinderGroup.add(grinderBase);

  // Clear bean hopper on top filled with dark roasted coffee beans
  const hopperGlass = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.26, 12), glassMat);
  hopperGlass.position.y = 0.47;
  grinderGroup.add(hopperGlass);

  const coffeeBeans = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), coffeeBeanMat);
  coffeeBeans.position.y = 0.46;
  grinderGroup.add(coffeeBeans);

  const hopperLid = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.025, 12), darkIronMat);
  hopperLid.position.y = 0.60;
  grinderGroup.add(hopperLid);

  barGroup.add(grinderGroup);

  // 5. Fresh Coffee Cups with Cat Paw Latte Art ☕🐾
  const coffeeSteamMotes = [];
  [-0.32, -0.65].forEach((cupZ, idx) => {
    const mugGroup = new THREE.Group();
    mugGroup.position.set(-0.42, 1.0, cupZ);
    mugGroup.name = 'latte_mug';
    mugGroup.userData = { isCoffeeMachine: true };

    // Wooden saucer
    const saucer = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.015, 16), accentWoodMat);
    saucer.position.y = 0.008;
    mugGroup.add(saucer);

    // Ceramic cup
    const cup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.05, 0.08, 16),
      new THREE.MeshStandardMaterial({ color: idx === 0 ? 0xffffff : 0x768f6b, roughness: 0.3 })
    );
    cup.position.y = 0.045;
    mugGroup.add(cup);

    // Cup handle
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.008, 8, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    handle.position.set(0.07, 0.05, 0);
    handle.rotation.y = Math.PI / 2;
    mugGroup.add(handle);

    // Foamy milk crema
    const crema = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.005, 16),
      new THREE.MeshStandardMaterial({ color: 0xf5ede3, roughness: 0.7 })
    );
    crema.position.y = 0.08;
    mugGroup.add(crema);

    // Cat Paw Latte Art on foam! (1 main pad + 4 toe dots)
    const pawArtMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.8 });
    const mainPad = new THREE.Mesh(new THREE.CircleGeometry(0.018, 10), pawArtMat);
    mainPad.rotation.x = -Math.PI / 2;
    mainPad.position.set(0, 0.084, 0.005);
    mugGroup.add(mainPad);

    [-0.018, -0.006, 0.006, 0.018].forEach((tx, ti) => {
      const toe = new THREE.Mesh(new THREE.CircleGeometry(0.006, 8), pawArtMat);
      toe.rotation.x = -Math.PI / 2;
      const ty = -0.018 - (ti === 1 || ti === 2 ? 0.004 : 0);
      toe.position.set(tx, 0.084, ty);
      mugGroup.add(toe);
    });

    // Rising hot steam puff motes
    for (let sm = 0; sm < 3; sm++) {
      const steam = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28 })
      );
      steam.position.set(0, 0.12 + sm * 0.09, 0);
      steam.userData = { baseY: 0.12, offset: sm * 0.3 };
      mugGroup.add(steam);
      coffeeSteamMotes.push(steam);
    }

    barGroup.add(mugGroup);
  });
  envGroup.userData.coffeeSteam = coffeeSteamMotes;

  // 6. Pastry & Croissant Glass Display Showcase (Etalase Kue)
  const pastryCaseGroup = new THREE.Group();
  pastryCaseGroup.position.set(0.05, 1.0, 0.65);

  const caseBase = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.04, 0.52), accentWoodMat);
  caseBase.position.y = 0.02;
  pastryCaseGroup.add(caseBase);

  const caseGlass = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.40, 0.50), glassMat);
  caseGlass.position.y = 0.24;
  pastryCaseGroup.add(caseGlass);

  // Ceramic plate with 2 golden croissants
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.015, 16), new THREE.MeshStandardMaterial({ color: 0xffffff }));
  plate.position.set(0, 0.05, 0);
  pastryCaseGroup.add(plate);

  [-0.06, 0.06].forEach((cx, ci) => {
    const croissant = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.028, 8, 14, Math.PI * 1.4), pastryMat);
    croissant.rotation.x = Math.PI / 2;
    croissant.rotation.z = ci * 0.4;
    croissant.position.set(cx, 0.085, 0);
    pastryCaseGroup.add(croissant);
  });

  barGroup.add(pastryCaseGroup);

  // 7. Cashier Register Terminal & Tip Jar
  const posTerminal = new THREE.Group();
  posTerminal.position.set(-0.25, 1.0, 1.55);

  const posStand = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.14, 8), darkIronMat);
  posStand.position.y = 0.07;
  posTerminal.add(posStand);

  const posScreen = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.18, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x212121, roughness: 0.2 })
  );
  posScreen.position.set(0, 0.18, 0);
  posScreen.rotation.x = -0.45;
  posTerminal.add(posScreen);

  // Glass Tip Jar with coins
  const tipJar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.055, 0.12, 10), glassMat);
  tipJar.position.set(0.22, 0.06, 0);
  posTerminal.add(tipJar);

  barGroup.add(posTerminal);

  // 8. Barista Floating Wall Shelves & Chalkboard Menu (On right wall)
  const shelvesGroup = new THREE.Group();
  shelvesGroup.position.set(2.45, 0, 0.2); // Positioned against right interior wall

  [2.1, 2.7].forEach((sy) => {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 3.4), accentWoodMat);
    shelf.position.set(0, sy, 0);
    shelvesGroup.add(shelf);

    // Glass jars with wooden lids
    [-1.2, -0.6, 0.0, 0.6].forEach((jx) => {
      const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.16, 10), glassMat);
      jar.position.set(0, sy + 0.10, jx);
      shelvesGroup.add(jar);

      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.062, 0.03, 10), lightWoodMat);
      lid.position.set(0, sy + 0.195, jx);
      shelvesGroup.add(lid);
    });
  });

  // Blackboard Menu
  const menuBoard = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 1.0, 1.4),
    new THREE.MeshStandardMaterial({ color: 0x212121, roughness: 0.8 })
  );
  menuBoard.position.set(0.08, 3.5, 0);
  shelvesGroup.add(menuBoard);

  const menuFrame = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.06, 1.46), accentWoodMat);
  menuFrame.position.set(0.06, 3.5, 0);
  shelvesGroup.add(menuFrame);

  barGroup.add(shelvesGroup);
  envGroup.add(barGroup);

  const yarnBall = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), new THREE.MeshStandardMaterial({ color: 0xa1887f }));
  yarnBall.name = 'yarn_ball';
  yarnBall.position.set(-0.6, 0.2, -0.8);
  envGroup.add(yarnBall);
  envGroup.userData.yarnBall = yarnBall;

  // Bistro Table
  const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.05, 24), lightWoodMat);
  tableTop.position.set(-4.5, 0.74, 6.8);
  envGroup.add(tableTop);

  const umbrellaCanopy = new THREE.Mesh(
    new THREE.ConeGeometry(1.4, 0.65, 12),
    new THREE.MeshStandardMaterial({ color: 0xf5f0eb, roughness: 0.75 })
  );
  umbrellaCanopy.position.set(-4.5, 2.4, 6.8);
  envGroup.add(umbrellaCanopy);

  const coffeeCup = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.045, 0.08, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
  coffeeCup.position.set(-4.35, 0.8, 6.9);
  envGroup.add(coffeeCup);

  scene.add(envGroup);
  return envGroup;
}

// Atmosphere & Sky Controller (Pagi / Siang / Sore / Malam + Weather Hujan)
export function updateAtmosphere(scene, timeOfDay, weather, envGroup) {
  let skyColor, sunColor, sunIntensity, ambientIntensity, streetLightIntensity;

  if (timeOfDay === 'morning') {
    skyColor = 0xffdfba;
    sunColor = 0xffe8d6;
    sunIntensity = 1.35;
    ambientIntensity = 0.85;
    streetLightIntensity = 0.3;
  } else if (timeOfDay === 'day') {
    skyColor = 0xa8d0e6;
    sunColor = 0xffffff;
    sunIntensity = 1.5;
    ambientIntensity = 0.95;
    streetLightIntensity = 0.1;
  } else if (timeOfDay === 'sunset') {
    skyColor = 0xf0937a;
    sunColor = 0xff7043;
    sunIntensity = 1.3;
    ambientIntensity = 0.75;
    streetLightIntensity = 1.3;
  } else { // 'night'
    skyColor = 0x0c111d;
    sunColor = 0x242d3d;
    sunIntensity = 0.2;
    ambientIntensity = 0.35;
    streetLightIntensity = 2.8;
  }

  const isRaining = weather === 'rain';
  if (isRaining) {
    skyColor = 0x546e7a;
    sunIntensity *= 0.45;
    ambientIntensity *= 0.8;
    streetLightIntensity += 0.8;
  }

  scene.background = new THREE.Color(skyColor);
  scene.fog = new THREE.FogExp2(skyColor, isRaining ? 0.025 : 0.014);

  let sunLight = scene.getObjectByName('main_sun_light');
  if (sunLight) {
    sunLight.color.setHex(sunColor);
    sunLight.intensity = sunIntensity;
    if (timeOfDay === 'morning') sunLight.position.set(-14, 5, 12);
    else if (timeOfDay === 'day') sunLight.position.set(4, 16, 8);
    else if (timeOfDay === 'sunset') sunLight.position.set(-10, 4, 14);
    else sunLight.position.set(0, 10, 0);
  }

  let ambientLight = scene.getObjectByName('main_ambient_light');
  if (ambientLight) ambientLight.intensity = ambientIntensity;

  if (envGroup) {
    if (envGroup.userData.rainSystem) {
      envGroup.userData.rainSystem.visible = isRaining;
    }

    if (envGroup.userData.starSystem) {
      envGroup.userData.starSystem.visible = (timeOfDay === 'night' && !isRaining);
    }
    if (envGroup.userData.moonGroup) {
      envGroup.userData.moonGroup.visible = (timeOfDay === 'night' && !isRaining);
    }

    if (envGroup.userData.cloudsGroup) {
      envGroup.userData.cloudsGroup.visible = (timeOfDay !== 'night' && !isRaining);
    }

    if (envGroup.userData.humans) {
      envGroup.userData.humans.forEach((human) => {
        if (human.userData.umbrellaGroup) {
          human.userData.umbrellaGroup.visible = isRaining;
        }
      });
    }

    // Boost City Lights at dusk, night, or during rain!
    if (envGroup.userData.cityLights) {
      const isDark = (timeOfDay === 'night' || timeOfDay === 'sunset' || isRaining);
      envGroup.userData.cityLights.forEach((lightMesh) => {
        if (lightMesh.material && lightMesh.material.emissiveIntensity !== undefined) {
          lightMesh.material.emissiveIntensity = isDark ? 1.6 : 0.4;
        }
      });
    }
  }
}
