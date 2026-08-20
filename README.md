# OpenCircuit 3D

OpenCircuit 3D is a browser-based electronics sandbox for building and testing
circuits in a 3D workspace. Projects stay in the browser and can be shared
through a compressed URL, so there are no accounts or server-side saves.

## What is included

- Breadboards, power sources and common electronic components
- Arduino Uno, Nano and Mega, plus ESP32 and Raspberry Pi Pico boards
- LEDs, buttons, transistors, MOSFETs, motors, servos, displays and sensors
- Multimeter, oscilloscope and logic analyzer
- Adjustable wire colors, grid snapping, rotation and undo/redo
- Arduino-style code execution and optional Intel HEX firmware support
- A lightweight live circuit solver with an optional ngspice/WASM backend

## Firmware

The fast runtime handles Arduino-style sketches and is useful for quick,
interactive experiments. It supports the usual GPIO, timing, serial, tone and
analog functions, along with helpers for the virtual displays and sensors.

Uno and Nano projects can also use AVR8js to execute ATmega328P firmware. An
optional browser-based AVR-GCC toolchain compiles C++ to Intel HEX without
sending source code to a server.

## Simulation scope

OpenCircuit aims to be useful for learning and prototyping, not to replace a
bench or a full electrical simulator. Uno and Nano have an AVR emulation path;
Mega, ESP32 and Pico currently use the faster behavioral runtime. Transistors,
MOSFETs and the NE555 also use simplified models during live simulation.

For circuits that need a more traditional SPICE analysis, the instruments
panel includes an optional ngspice/WASM backend.

## Browser dependencies

The 3D renderer and optional firmware/SPICE tools are loaded on demand from
public CDNs. The main dependencies are Three.js, AVR8js,
`@horang-corp/avr-gcc-wasm` and `@o.z/ngspice-wasm`.

Third-party licenses and notices are listed in [THIRD_PARTY.md](THIRD_PARTY.md).

## License

OpenCircuit 3D is released under the MIT License. Bundled and externally loaded
third-party components keep their respective licenses.
