# OpenCircuit 3

Use it https://opencircuit.pages.dev/

OpenCircuit 3D is a browser-based electronics sandbox for building and testing
circuits in a 3D workspace. Projects stay in the browser and can be shared
through a compressed URL, so there are no accounts or server-side saves.

OpenCircuit also includes a **Classic / Diode-style mode** designed for people
who miss the simple workflow of the former Diode browser simulator. It keeps the
familiar build → wire → program → simulate experience while leaving the full
OpenCircuit toolset available at any time. OpenCircuit is an independent project
and is not affiliated with the former Diode product.

## What is included

- Breadboards, power sources and common electronic components
- Arduino Uno, Nano and Mega, plus ESP32 and Raspberry Pi Pico boards
- LEDs, buttons, transistors, MOSFETs, motors, servos, displays and sensors
- Multimeter, oscilloscope and logic analyzer
- Adjustable wire colors, grid snapping, rotation and undo/redo
- Arduino-style code execution and optional Intel HEX firmware support
- A lightweight live circuit solver with an optional ngspice/WASM backend
- Auto-running interactive presets with a live Result panel and enlarged display previews
- Classic / Diode-style simplified workspace mode
- Rebuilt Classic labs: Arduino Blink, LED & Switch, NPN transistor, PNP transistor, NAND gate, NE555 astable, Slow Fade LED, Sensor → LCD and Pot → Servo
- Local Fork / duplicate workflow without accounts
- Embeddable project iframe snippets
- Responsive mobile/tablet drawers for Parts and Lab panels

Tactile switches can be held directly in the 3D scene, logic sources toggle on
click, and preset sensors/potentiometers have accessible controls in the Result
tab. The in-app [learning guide](guide.html) explains the preset workflow, the
languages used, and why the fast runtime, AVR8js and SPICE paths coexist.

## Classic continuity mode

Classic mode deliberately hides some laboratory-only controls while preserving
the underlying circuit, editor and simulation state. Switching back to the full
workspace restores the advanced tools immediately. This gives former Diode-style
users a low-friction starting point without creating a separate or reduced
simulator.

The rebuilt Classic circuits are new OpenCircuit implementations rather than
copies of Diode source code or assets. They reproduce useful learning workflows
such as transistor switching, NAND logic, an astable NE555 oscillator and PWM LED
fading.

Projects can also be duplicated locally (Fork) and embedded in other pages. No
account is required for either workflow.

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
Mega, ESP32 and Pico currently use the faster behavioral runtime.

The live BJT model now transitions progressively between cutoff and conduction
instead of relying on a single hard threshold. The NE555 model includes reset,
1/3–2/3 threshold hysteresis, discharge behavior and support for the control
voltage pin. These are still behavioral educational models rather than
transistor-level device simulations.

For circuits that need a more traditional SPICE analysis, the instruments
panel includes an optional ngspice/WASM backend.

## Browser dependencies

The 3D renderer and optional firmware/SPICE tools are loaded on demand from
public CDNs. The main dependencies are Three.js, AVR8js,
`@horang-corp/avr-gcc-wasm` and `@o.z/ngspice-wasm`.

Third-party licenses and notices are listed in [THIRD_PARTY.md](THIRD_PARTY.md).

## Credits

[gabrieleviola.it](https://gabrieleviola.it)

## Legal documents

- [Privacy Policy](privacy.html)
- [Cookie Policy](cookies.html)
- [Terms of use](terms.html)
- [Legal notice and accessibility](legal.html)

## License

OpenCircuit 3D is released under the MIT License. Bundled and externally loaded
third-party components keep their respective licenses.
