# Third-party runtime notes

OpenCircuit 3D itself is MIT licensed. The application lazily loads optional third-party packages in the user's browser for advanced simulation paths.

## Three.js

- Package: `three`
- Pinned version in `index.html`: `0.180.0`
- License: MIT
- Used for WebGL rendering and scene controls.

## AVR8js

- Package: `avr8js`
- Pinned version: `0.21.0`
- License: MIT
- Loaded only when the AVR firmware mode is started.
- Used for ATmega328P instruction/peripheral emulation.

## Browser AVR-GCC

- Package: `@horang-corp/avr-gcc-wasm`
- Pinned version: `0.2.0`
- Loaded only when Compile C++ → HEX is requested.
- The distribution includes AVR-GCC/binutils/WebAssembly and Arduino-related assets with their own upstream licenses. If you mirror or redistribute the compiler package, preserve the package's own notices/source obligations.

## ngspice WebAssembly

- Package: `@o.z/ngspice-wasm`
- Pinned version used by the loader: `0.0.0`
- Loaded only when the SPICE action is requested.
- ngspice and the wrapper/package have their own license terms. Review upstream notices before redistributing a mirrored copy.

The default project references version-pinned public CDN URLs instead of copying these packages into this repository. This keeps the starter small and avoids relicensing third-party source as part of the MIT application code.
