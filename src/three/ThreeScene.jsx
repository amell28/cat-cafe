import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';
import { createCatModel, updateCatAnimation, attachAccessory } from './catModelBuilder.js';
import { buildPetShopEnvironment, updateAtmosphere } from './environmentBuilder.js';
import { soundEngine } from '../audio/soundEffects.js';

export default function ThreeScene({
  activeView,
  timeOfDay,
  weather = 'clear',
  activeTool,
  catsList,
  onSelectCat,
  onCatPetted,
  onSnapshotReady,
  snapshotRequested,
  cameraPreset
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const envGroupRef = useRef(null);
  const catMeshesRef = useRef(new Map());
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const laserPointerMeshRef = useRef(null);
  const laserBeamRef = useRef(null);
  const laserSpecklesRef = useRef([]);
  const laserRippleRef = useRef(null);
  const laserLightRef = useRef(null);
  const laserTargetPosRef = useRef(null);
  const treatsGroupRef = useRef(new THREE.Group());
  const floatingHeartsGroupRef = useRef(new THREE.Group());
  const animationFrameIdRef = useRef(null);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 12.5); // Default to exterior view
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true // Required for photobooth screenshots!
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't clip under the floor
    controls.minDistance = 2.0;
    controls.maxDistance = 22.0;
    controls.target.set(0, 1.8, 4.5);
    controlsRef.current = controls;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    ambientLight.name = 'main_ambient_light';
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.6);
    sunLight.name = 'main_sun_light';
    sunLight.position.set(8, 12, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 35;
    sunLight.shadow.camera.left = -12;
    sunLight.shadow.camera.right = 12;
    sunLight.shadow.camera.top = 12;
    sunLight.shadow.camera.bottom = -12;
    sunLight.shadow.bias = -0.0015;
    scene.add(sunLight);

    // 6. Build Environment
    const envGroup = buildPetShopEnvironment(scene);
    envGroupRef.current = envGroup;

    // 7. Interactive Groups
    scene.add(treatsGroupRef.current);
    scene.add(floatingHeartsGroupRef.current);

    // 8. Advanced 3D Laser Pointer System (Core, Halo, Ripple, Point Light, Speckles & Beam)
    const laserGroup = new THREE.Group();
    laserGroup.name = 'laser_pointer_system';
    laserGroup.userData = { isLaser: true };

    // Bright white-hot core
    const laserCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    laserCore.userData = { isLaser: true };
    laserGroup.add(laserCore);

    // Inner vibrant red halo
    const laserInnerHalo = new THREE.Mesh(
      new THREE.RingGeometry(0.02, 0.08, 24),
      new THREE.MeshBasicMaterial({
        color: 0xff0033,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending
      })
    );
    laserInnerHalo.userData = { isLaser: true };
    laserGroup.add(laserInnerHalo);

    // Pulsing outer ripple ring
    const laserRipple = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.22, 32),
      new THREE.MeshBasicMaterial({
        color: 0xff2244,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      })
    );
    laserRipple.userData = { isLaser: true };
    laserGroup.add(laserRipple);
    laserRippleRef.current = laserRipple;

    // Real dynamic point light casting vibrant red illumination onto floors & walls
    const laserLight = new THREE.PointLight(0xff0033, 1.8, 2.8);
    laserLight.userData = { isLaser: true };
    laserGroup.add(laserLight);
    laserLightRef.current = laserLight;

    // Animated laser speckles (4 micro-sparkles)
    const speckles = [];
    for (let s = 0; s < 4; s++) {
      const sp = new THREE.Mesh(
        new THREE.SphereGeometry(0.012, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xff7788, transparent: true, opacity: 0.85 })
      );
      sp.userData = { isLaser: true };
      laserGroup.add(sp);
      speckles.push(sp);
    }
    laserSpecklesRef.current = speckles;

    laserGroup.visible = false;
    scene.add(laserGroup);
    laserPointerMeshRef.current = laserGroup;

    // Glowing red laser beam line from camera towards target
    const beamGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0)
    ]);
    const beamMaterial = new THREE.LineBasicMaterial({
      color: 0xff1133,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      linewidth: 2
    });
    const laserBeam = new THREE.Line(beamGeometry, beamMaterial);
    laserBeam.userData = { isLaser: true };
    laserBeam.visible = false;
    scene.add(laserBeam);
    laserBeamRef.current = laserBeam;

    // 9. Instantiate Cats
    catsList.forEach((catData) => {
      const catMesh = createCatModel(catData);
      scene.add(catMesh);
      catMeshesRef.current.set(catData.id, catMesh);
    });

    // Initial Atmosphere
    updateAtmosphere(scene, timeOfDay, weather, envGroup);

    // 10. Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Update TWEEN
      TWEEN.update();

      // Update Orbit Controls
      controls.update();

      // Update Cats
      catMeshesRef.current.forEach((catMesh) => {
        updateCatAnimation(
          catMesh,
          delta,
          elapsedTime,
          laserPointerMeshRef.current?.visible ? laserTargetPosRef.current : null
        );
      });

      // Animate Laser Dot Pulse, Speckles & Glowing Beam
      if (laserPointerMeshRef.current?.visible && cameraRef.current) {
        if (laserRippleRef.current) {
          laserRippleRef.current.scale.setScalar(1.0 + Math.sin(elapsedTime * 14) * 0.16);
        }
        if (laserLightRef.current) {
          laserLightRef.current.intensity = 1.6 + Math.sin(elapsedTime * 20) * 0.4;
        }
        // Jitter speckles
        laserSpecklesRef.current.forEach((sp, idx) => {
          const angle = elapsedTime * 9 + idx * (Math.PI / 2);
          const r = 0.055 + Math.sin(elapsedTime * 17 + idx) * 0.025;
          sp.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0.005);
        });

        // Update Laser Beam line connecting camera and laser dot
        if (laserBeamRef.current) {
          const camPos = cameraRef.current.position;
          const camDir = new THREE.Vector3();
          cameraRef.current.getWorldDirection(camDir);
          const beamStart = camPos.clone().addScaledVector(camDir, 0.45);
          beamStart.y -= 0.12;
          beamStart.x += 0.08;
          const beamEnd = laserPointerMeshRef.current.position;
          laserBeamRef.current.geometry.setFromPoints([beamStart, beamEnd]);
          laserBeamRef.current.visible = true;
        }
      } else if (laserBeamRef.current) {
        laserBeamRef.current.visible = false;
      }

      // Update Spa Bubbles gentle bobbing
      if (envGroupRef.current?.userData?.bubbles) {
        envGroupRef.current.userData.bubbles.forEach((bubble, idx) => {
          bubble.position.y += Math.sin(elapsedTime * 2 + idx) * 0.0008;
          bubble.scale.setScalar(1 + Math.sin(elapsedTime * 3 + idx) * 0.05);
        });
      }

      // Update Hot Coffee Steam Rising
      if (envGroupRef.current?.userData?.coffeeSteam) {
        envGroupRef.current.userData.coffeeSteam.forEach((steam) => {
          steam.position.y += delta * 0.12;
          const progress = (steam.position.y - steam.userData.baseY) / 0.35;
          steam.scale.setScalar(1 + progress * 1.5);
          if (steam.material) {
            steam.material.opacity = Math.max(0, 0.28 * (1 - progress));
          }
          if (progress >= 1.0) {
            steam.position.y = steam.userData.baseY;
          }
        });
      }

      // Update Floating Dust Motes
      if (envGroupRef.current?.userData?.particleSystem) {
        const particles = envGroupRef.current.userData.particleSystem;
        particles.rotation.y = elapsedTime * 0.02;
      }

      // Update Outdoor Fluttering Butterflies
      if (envGroupRef.current?.userData?.butterflies) {
        envGroupRef.current.userData.butterflies.forEach((bf) => {
          const { leftWing, rightWing, orbitRadius, orbitSpeed, centerX, centerZ, baseY } = bf.userData;
          // Wing flap
          const flap = Math.sin(elapsedTime * 18) * 0.75;
          leftWing.rotation.y = flap;
          rightWing.rotation.y = -flap;

          // Orbit path in the outdoor garden
          const angle = elapsedTime * orbitSpeed;
          bf.position.x = centerX + Math.cos(angle) * orbitRadius;
          bf.position.z = centerZ + Math.sin(angle) * (orbitRadius * 0.6);
          bf.position.y = baseY + Math.sin(elapsedTime * 3) * 0.2;
          bf.rotation.y = -angle + Math.PI / 2;
        });
      }

      // Update Outdoor Birds Pecking Breadcrumbs on Sidewalk
      if (envGroupRef.current?.userData?.birds) {
        envGroupRef.current.userData.birds.forEach((bird, idx) => {
          const pecking = Math.sin(elapsedTime * (bird.userData.peckingSpeed || 4) + idx);
          if (pecking > 0.4) {
            bird.rotation.x = THREE.MathUtils.lerp(bird.rotation.x, 0.45, 0.25);
          } else {
            bird.rotation.x = THREE.MathUtils.lerp(bird.rotation.x, 0, 0.2);
          }
        });
      }

      // Update Moving 3D Vehicles (Cars & Scooters)
      if (envGroupRef.current?.userData?.vehicles) {
        envGroupRef.current.userData.vehicles.forEach((veh) => {
          const { speed, minX, maxX, wheels, direction } = veh.userData;
          veh.position.x += direction * speed * delta;
          if (direction === 1 && veh.position.x > maxX) {
            veh.position.x = minX;
          } else if (direction === -1 && veh.position.x < minX) {
            veh.position.x = maxX;
          }
          if (wheels) {
            wheels.forEach((w) => {
              w.rotation.x += direction * speed * 2 * delta;
            });
          }
        });
      }

      // Update Animated 3D Pedestrians (Walking Humans)
      if (envGroupRef.current?.userData?.humans) {
        envGroupRef.current.userData.humans.forEach((human) => {
          const { leftLeg, rightLeg, leftArm, rightArm, pathMinX, pathMaxX, speed, walkCycleOffset } = human.userData;
          human.position.x += human.userData.direction * speed * delta;
          if (human.position.x > pathMaxX) {
            human.userData.direction = -1;
            human.rotation.y = -Math.PI / 2;
          } else if (human.position.x < pathMinX) {
            human.userData.direction = 1;
            human.rotation.y = Math.PI / 2;
          }

          const walkCycle = Math.sin(elapsedTime * 6 + walkCycleOffset);
          leftLeg.rotation.x = walkCycle * 0.45;
          rightLeg.rotation.x = -walkCycle * 0.45;
          leftArm.rotation.x = -walkCycle * 0.35;
          rightArm.rotation.x = walkCycle * 0.35;
        });
      }

      // Update Swaying Trees in Wind
      if (envGroupRef.current?.userData?.swayingTrees) {
        const windIntensity = weather === 'rain' ? 1.8 : 1.0;
        envGroupRef.current.userData.swayingTrees.forEach((tree) => {
          const { foliageGroup, swayOffset, swaySpeed } = tree.userData;
          const sway = Math.sin(elapsedTime * swaySpeed * windIntensity + swayOffset) * (0.05 * windIntensity);
          foliageGroup.rotation.z = sway;
          foliageGroup.rotation.x = Math.cos(elapsedTime * (swaySpeed * 0.8) + swayOffset) * (0.03 * windIntensity);
        });
      }

      // Update Swirling Wind Leaves / Petals
      if (envGroupRef.current?.userData?.leafSystem) {
        const leaves = envGroupRef.current.userData.leafSystem;
        const lPositions = leaves.geometry.attributes.position.array;
        const windSpeed = weather === 'rain' ? 8.0 : 4.5;
        for (let l = 0; l < lPositions.length; l += 3) {
          lPositions[l] += windSpeed * delta; // Blown by wind
          lPositions[l + 1] += Math.sin(elapsedTime * 4 + l) * 0.04 - 0.8 * delta; // Floating down
          lPositions[l + 2] += Math.cos(elapsedTime * 2 + l) * 0.05;
          // Wrap around
          if (lPositions[l] > 20) lPositions[l] = -20;
          if (lPositions[l + 1] < 0.2) lPositions[l + 1] = 6.0;
        }
        leaves.geometry.attributes.position.needsUpdate = true;
      }

      // Update Rain Particle System Falling
      if (envGroupRef.current?.userData?.rainSystem?.visible) {
        const rain = envGroupRef.current.userData.rainSystem;
        const positions = rain.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] -= 22 * delta; // Fall down fast
          positions[i - 1] -= 3.5 * delta; // Blown by wind angle
          if (positions[i] < 0) {
            positions[i] = 16;
            positions[i - 1] += 2.5;
          }
        }
        rain.geometry.attributes.position.needsUpdate = true;
      }

      // Update Fluffy Clouds Drifting
      if (envGroupRef.current?.userData?.cloudsGroup) {
        const clouds = envGroupRef.current.userData.cloudsGroup;
        clouds.position.x += 0.3 * delta;
        if (clouds.position.x > 32) clouds.position.x = -32;
      }

      // Update Floating Love Hearts & Laser Sparks
      for (let h = floatingHeartsGroupRef.current.children.length - 1; h >= 0; h--) {
        const item = floatingHeartsGroupRef.current.children[h];
        if (item.userData.isSpark) {
          item.userData.life -= delta;
          item.position.addScaledVector(item.userData.vel, delta);
          item.scale.multiplyScalar(0.92);
          if (item.userData.life <= 0) {
            floatingHeartsGroupRef.current.remove(item);
          }
        } else {
          item.position.y += delta * 0.9;
          item.rotation.y += delta * 2;
          item.scale.multiplyScalar(0.985); // Fade out
          if (item.position.y > item.userData.startY + 1.2 || item.scale.x < 0.1) {
            floatingHeartsGroupRef.current.remove(item);
          }
        }
      }

      // Update Treats decay/bobbing
      treatsGroupRef.current.children.forEach((treat) => {
        treat.rotation.y += delta * 1.5;
        if (treat.userData.lifespan) {
          treat.userData.lifespan -= delta;
          if (treat.userData.lifespan <= 0) {
            treatsGroupRef.current.remove(treat);
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      renderer.dispose();
    };
  }, []); // Run once on mount

  // Sync Atmosphere when timeOfDay or weather changes
  useEffect(() => {
    if (sceneRef.current && envGroupRef.current) {
      updateAtmosphere(sceneRef.current, timeOfDay, weather, envGroupRef.current);
    }
    if (weather === 'rain') {
      soundEngine.startRain();
    } else {
      soundEngine.stopRain();
    }
  }, [timeOfDay, weather]);

  // Sync Cats Accessories if updated in state
  useEffect(() => {
    catsList.forEach((catData) => {
      const catMesh = catMeshesRef.current.get(catData.id);
      if (catMesh && catMesh.userData.accessoryId !== catData.accessory) {
        attachAccessory(catMesh, catData.accessory || 'none');
      }
    });
  }, [catsList]);

  // Handle Camera Transitions smoothly
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current || !cameraPreset) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    const targetPos = new THREE.Vector3(...cameraPreset.cameraPos);
    const lookAtPos = new THREE.Vector3(...cameraPreset.targetPos);

    // Smooth TWEEN Camera Transition
    new TWEEN.Tween(camera.position)
      .to({ x: targetPos.x, y: targetPos.y, z: targetPos.z }, 1200)
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();

    new TWEEN.Tween(controls.target)
      .to({ x: lookAtPos.x, y: lookAtPos.y, z: lookAtPos.z }, 1200)
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();
  }, [cameraPreset]);

  // Spawn floating 3D love hearts above a cat
  const spawnHearts = useCallback((position) => {
    const heartGroup = floatingHeartsGroupRef.current;
    if (!heartGroup) return;

    for (let i = 0; i < 3; i++) {
      const heartShape = new THREE.Shape();
      const x = 0, y = 0;
      heartShape.moveTo(x + 0.05, y + 0.05);
      heartShape.bezierCurveTo(x + 0.05, y + 0.05, x + 0.04, y, x, y);
      heartShape.bezierCurveTo(x - 0.06, y, x - 0.06, y + 0.07, x - 0.06, y + 0.07);
      heartShape.bezierCurveTo(x - 0.06, y + 0.11, x - 0.03, y + 0.154, x + 0.05, y + 0.19);
      heartShape.bezierCurveTo(x + 0.12, y + 0.154, x + 0.16, y + 0.11, x + 0.16, y + 0.07);
      heartShape.bezierCurveTo(x + 0.16, y + 0.07, x + 0.16, y, x + 0.1, y);
      heartShape.bezierCurveTo(x + 0.07, y, x + 0.05, y + 0.05, x + 0.05, y + 0.05);

      const geom = new THREE.ShapeGeometry(heartShape);
      geom.center();
      const mat = new THREE.MeshBasicMaterial({
        color: 0xff3366,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.scale.setScalar(0.7 + Math.random() * 0.4);
      mesh.position.set(
        position.x + (Math.random() - 0.5) * 0.4,
        position.y + 0.7 + i * 0.2,
        position.z + (Math.random() - 0.5) * 0.4
      );
      mesh.userData = { startY: mesh.position.y };
      heartGroup.add(mesh);
    }
  }, []);

  // Drop a 3D Fish / Treat on the floor
  const dropTreat = useCallback((point) => {
    const treatsGroup = treatsGroupRef.current;
    if (!treatsGroup) return;

    // Stylized Fish Treat
    const fishGroup = new THREE.Group();
    fishGroup.position.set(point.x, point.y + 0.08, point.z);
    fishGroup.userData = { lifespan: 8.0 };

    const fishBody = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 10, 8),
      new THREE.MeshStandardMaterial({ color: 0xff793f, roughness: 0.3 })
    );
    fishBody.scale.set(1.4, 0.6, 0.7);
    fishGroup.add(fishBody);

    const fishTail = new THREE.Mesh(
      new THREE.ConeGeometry(0.08, 0.12, 4),
      new THREE.MeshStandardMaterial({ color: 0xcd6133, roughness: 0.4 })
    );
    fishTail.rotation.z = Math.PI / 2;
    fishTail.position.set(-0.16, 0, 0);
    fishGroup.add(fishTail);

    treatsGroup.add(fishGroup);
    soundEngine.playTreatCrunch();

    // Notify nearest cat to walk towards treat!
    let closestCat = null;
    let minDist = Infinity;
    catMeshesRef.current.forEach((catMesh) => {
      const dist = catMesh.position.distanceTo(point);
      if (dist < minDist) {
        minDist = dist;
        closestCat = catMesh;
      }
    });

    if (closestCat && minDist < 6.0) {
      closestCat.userData.targetPosition = point.clone();
      soundEngine.playMeow(closestCat.userData.catData.voicePitch || 1.0);
      spawnHearts(closestCat.position);
    }
  }, [spawnHearts]);

  // Spawn playful 3D laser sparks on pounce or click
  const spawnLaserSparks = useCallback((point) => {
    const heartGroup = floatingHeartsGroupRef.current;
    if (!heartGroup) return;

    for (let i = 0; i < 7; i++) {
      const geom = new THREE.SphereGeometry(0.025, 6, 6);
      const mat = new THREE.MeshBasicMaterial({ color: 0xff1144 });
      const spark = new THREE.Mesh(geom, mat);
      spark.position.copy(point);
      spark.position.y += 0.05;
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 1.8,
        Math.random() * 1.5 + 0.6,
        (Math.random() - 0.5) * 1.8
      );
      spark.userData = { isSpark: true, vel, life: 0.45 };
      heartGroup.add(spark);
    }
  }, []);

  // Update onPounceLaser handlers on all cats so they react with sound, happiness and sparks!
  useEffect(() => {
    catMeshesRef.current.forEach((catMesh) => {
      catMesh.userData.onPounceLaser = (cat) => {
        soundEngine.playLaserChirp();
        setTimeout(() => soundEngine.playPurr(), 250);
        spawnHearts(cat.position);
        spawnLaserSparks(cat.position);
        if (onCatPetted) {
          onCatPetted(cat.userData.id);
        }
      };
    });
  }, [spawnHearts, spawnLaserSparks, onCatPetted]);

  // Handle Active Tool & Camera OrbitControls lock during Laser Mode
  useEffect(() => {
    if (controlsRef.current) {
      if (activeTool === 'laser') {
        // While aiming laser, left click or 1-finger touch won't jerk or spin the camera
        // Right click or 2-finger pinch/drag allows rotating and zooming the camera
        controlsRef.current.mouseButtons = {
          LEFT: null,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.ROTATE
        };
        controlsRef.current.touches = {
          ONE: null,
          TWO: THREE.TOUCH.DOLLY_ROTATE
        };
      } else {
        controlsRef.current.mouseButtons = {
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.ROTATE
        };
        controlsRef.current.touches = {
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN
        };
      }
    }

    if (activeTool !== 'laser') {
      if (laserPointerMeshRef.current) laserPointerMeshRef.current.visible = false;
      if (laserBeamRef.current) laserBeamRef.current.visible = false;
      laserTargetPosRef.current = null;
      catMeshesRef.current.forEach((catMesh) => {
        catMesh.userData.isChasingLaser = false;
      });
    }
  }, [activeTool]);

  // Handle Laser Pointer Movement
  const handlePointerMove = (e) => {
    if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (activeTool === 'laser') {
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children, true);

      // Clean filter: Ignore laser itself, cats, particles, raindrops, clouds, and skies
      const hit = intersects.find((i) => {
        if (!i.object) return false;
        if (i.object.userData?.isLaser) return false;
        let p = i.object;
        while (p && p !== sceneRef.current) {
          if (p === laserPointerMeshRef.current || p === laserBeamRef.current) return false;
          if (p.name && (p.name.startsWith('cat_') || p.name === 'laser_pointer_system')) return false;
          if (p.userData?.isLaser || p.userData?.isParticle || p.userData?.isSky || p.userData?.isRain || p.userData?.isBubble) return false;
          p = p.parent;
        }
        return true;
      });

      if (hit && laserPointerMeshRef.current) {
        laserPointerMeshRef.current.visible = true;

        // Calculate surface normal so laser dot and ring lie flush on floor, wall, or furniture
        const normal = hit.face
          ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize()
          : new THREE.Vector3(0, 1, 0);

        laserPointerMeshRef.current.position.copy(hit.point).addScaledVector(normal, 0.02);
        // Align disc normal with surface normal
        laserPointerMeshRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

        laserTargetPosRef.current = hit.point.clone();

        // Find nearest energetic cat (Oyen gets priority) to sprint and chase laser!
        let bestCat = null;
        let minScore = Infinity;
        catMeshesRef.current.forEach((catMesh) => {
          const dist = catMesh.position.distanceTo(hit.point);
          if (dist < 10.0) {
            const score = catMesh.userData.id === 'oyen' ? dist * 0.6 : dist;
            if (score < minScore) {
              minScore = score;
              bestCat = catMesh;
            }
          }
        });

        if (bestCat) {
          bestCat.userData.targetPosition = hit.point.clone();
          bestCat.userData.isChasingLaser = true;
        }
      }
    } else {
      if (laserPointerMeshRef.current) {
        laserPointerMeshRef.current.visible = false;
        laserTargetPosRef.current = null;
      }
      if (laserBeamRef.current) {
        laserBeamRef.current.visible = false;
      }
    }
  };

  // Handle Canvas Click Interactions
  const handleCanvasClick = (e) => {
    if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children, true);

    if (intersects.length === 0) return;

    // Laser Pointer Mode Click Trigger
    if (activeTool === 'laser') {
      const hit = intersects.find((i) => {
        if (!i.object) return false;
        if (i.object.userData?.isLaser) return false;
        let p = i.object;
        while (p && p !== sceneRef.current) {
          if (p === laserPointerMeshRef.current || p === laserBeamRef.current) return false;
          if (p.name && (p.name.startsWith('cat_') || p.name === 'laser_pointer_system')) return false;
          if (p.userData?.isLaser || p.userData?.isParticle || p.userData?.isSky || p.userData?.isRain || p.userData?.isBubble) return false;
          p = p.parent;
        }
        return true;
      });

      if (hit && laserPointerMeshRef.current) {
        soundEngine.playLaserClick();
        spawnLaserSparks(hit.point);

        // Animate pulse flash ripple
        if (laserRippleRef.current) {
          laserRippleRef.current.scale.set(2.4, 2.4, 2.4);
          new TWEEN.Tween(laserRippleRef.current.scale)
            .to({ x: 1, y: 1, z: 1 }, 220)
            .easing(TWEEN.Easing.Back.Out)
            .start();
        }

        // Alert nearest cats to sprint & pounce immediately!
        let nearestCat = null;
        let minDist = Infinity;
        catMeshesRef.current.forEach((catMesh) => {
          const dist = catMesh.position.distanceTo(hit.point);
          if (dist < 12.0) {
            const score = catMesh.userData.id === 'oyen' ? dist * 0.6 : dist;
            if (score < minDist) {
              minDist = score;
              nearestCat = catMesh;
            }
          }
        });

        if (nearestCat) {
          nearestCat.userData.targetPosition = hit.point.clone();
          nearestCat.userData.isChasingLaser = true;
          soundEngine.playLaserChirp();
        }
      }
      return;
    }

    // Check if clicked a cat
    let clickedCatMesh = null;
    for (const hit of intersects) {
      let cur = hit.object;
      while (cur && cur !== sceneRef.current) {
        if (cur.name && cur.name.startsWith('cat_')) {
          clickedCatMesh = cur;
          break;
        }
        cur = cur.parent;
      }
      if (clickedCatMesh) break;
    }

    if (clickedCatMesh) {
      const catData = clickedCatMesh.userData.catData;
      soundEngine.playMeow(catData.voicePitch || 1.0);
      spawnHearts(clickedCatMesh.position);

      if (activeTool === 'pet') {
        soundEngine.playPurr();
        if (onCatPetted) onCatPetted(catData.id);
      } else if (activeTool === 'spa') {
        soundEngine.playBubble();
      }

      if (onSelectCat) {
        onSelectCat(catData);
      }
      return;
    }

    // Check if clicked the Front Entrance Door (Opens and Closes with Melodic Bell Chime)
    let clickedDoor = false;
    for (const hit of intersects) {
      let cur = hit.object;
      while (cur && cur !== sceneRef.current) {
        if (cur.name === 'cafe_front_door' || cur.userData?.isDoor) {
          clickedDoor = true;
          break;
        }
        cur = cur.parent;
      }
      if (clickedDoor) break;
    }

    if (clickedDoor && envGroupRef.current?.userData?.doorPivot) {
      const doorPivot = envGroupRef.current.userData.doorPivot;
      const isOpen = !doorPivot.userData.isOpen;
      doorPivot.userData.isOpen = isOpen;

      soundEngine.playDoorSound(isOpen);

      // Swing door open inwards (-88 deg) or close back to 0 deg smoothly
      const targetAngle = isOpen ? -Math.PI * 0.48 : 0;
      new TWEEN.Tween(doorPivot.rotation)
        .to({ y: targetAngle }, 750)
        .easing(TWEEN.Easing.Cubic.Out)
        .start();

      return;
    }

    // Check if clicked the Espresso Machine or Latte Art Mug (Brews fresh coffee!)
    let clickedCoffee = false;
    for (const hit of intersects) {
      let cur = hit.object;
      while (cur && cur !== sceneRef.current) {
        if (cur.name === 'espresso_machine' || cur.userData?.isCoffeeMachine || cur.name === 'latte_mug') {
          clickedCoffee = true;
          break;
        }
        cur = cur.parent;
      }
      if (clickedCoffee) break;
    }

    if (clickedCoffee) {
      soundEngine.playCoffeeBrew();
      if (envGroupRef.current?.userData?.espressoPos) {
        spawnHearts(envGroupRef.current.userData.espressoPos);
        spawnLaserSparks(envGroupRef.current.userData.espressoPos);
      }
      // Boba the Barista Cat greets and meows excitedly!
      const bobaCat = catMeshesRef.current.get('boba');
      if (bobaCat) {
        soundEngine.playMeow(1.25);
        spawnHearts(bobaCat.position);
      }
      return;
    }

    // Check if clicked the yarn ball
    const hitYarn = intersects.find((h) => h.object.name === 'yarn_ball');
    if (hitYarn) {
      const yarn = hitYarn.object;
      soundEngine.playClick();
      // Roll yarn ball
      new TWEEN.Tween(yarn.position)
        .to({
          x: yarn.position.x + (Math.random() - 0.5) * 2.5,
          z: yarn.position.z + (Math.random() - 0.5) * 2.5
        }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(yarn.rotation)
        .to({ x: yarn.rotation.x + Math.PI * 4, z: yarn.rotation.z + Math.PI * 4 }, 1000)
        .start();
      return;
    }

    // If active tool is 'feed' and clicked on floor
    if (activeTool === 'feed') {
      const floorHit = intersects.find((i) => i.point.y < 0.5);
      if (floorHit) {
        dropTreat(floorHit.point);
      }
    }
  };

  // Dynamic touch control configuration for mobile
  useEffect(() => {
    if (!controlsRef.current) return;
    if (activeTool === 'laser') {
      // In laser mode, allow single-finger swipe to move the laser across surfaces
      // Two-finger pinch rotates and zooms
      controlsRef.current.touches = {
        ONE: null,
        TWO: THREE.TOUCH.DOLLY_ROTATE
      };
    } else {
      // In regular mode, single touch orbits camera, two touch zooms/pans
      controlsRef.current.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN
      };
    }
  }, [activeTool]);

  // Mobile pointer tap tracker for rapid, lag-free tapping on mobile screens
  const pointerDownPosRef = useRef({ x: 0, y: 0, time: 0 });

  const handlePointerDown = (e) => {
    pointerDownPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    };
    handlePointerMove(e);
  };

  const handlePointerUp = (e) => {
    const dx = Math.abs(e.clientX - pointerDownPosRef.current.x);
    const dy = Math.abs(e.clientY - pointerDownPosRef.current.y);
    const dt = Date.now() - pointerDownPosRef.current.time;
    // If user tapped without dragging (< 14px in under 450ms), trigger interaction
    if (dx < 14 && dy < 14 && dt < 450) {
      handleCanvasClick(e);
    }
  };

  // Handle Photobooth Snapshot Request
  useEffect(() => {
    if (snapshotRequested && rendererRef.current && sceneRef.current && cameraRef.current) {
      // Hide laser dot during photo
      if (laserPointerMeshRef.current) laserPointerMeshRef.current.visible = false;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
      if (onSnapshotReady) {
        onSnapshotReady(dataUrl);
      }
    }
  }, [snapshotRequested, onSnapshotReady]);

  return (
    <div
      ref={containerRef}
      className="scene-container"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        userSelect: 'none',
        cursor: activeTool === 'laser' ? 'crosshair' : activeTool === 'feed' ? 'cell' : 'grab'
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }} />
    </div>
  );
}
