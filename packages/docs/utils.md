# Utils & API Reference

FlueKit provides a collection of utility functions and constants to help you build layouts more efficiently.

## Global Configuration

### px2vw

FlueKit uses a `px` to `vw` responsive solution by default. The default design width is **750px**.

```typescript
import { px2vw } from "fluekit";

console.log(px2vw(750)); // "100vw"
console.log(px2vw(375)); // "50vw"
```

### setDefaultVW

Sets the default design width. Recommended to call this at the entry point of your application.

```typescript
import { setDefaultVW } from "fluekit";

// Set design width to 375px
setDefaultVW(375);
```

### setTransform

Enables or disables automatic `px` to `vw` conversion. Defaults to `true` internally for processing logic, but the library initialization sets it to `false` by default (meaning numbers are treated as px unless configured otherwise).

```typescript
import { setTransform } from "fluekit";

setTransform(false); // Disable conversion, numbers will be treated as px
```

### setBaseUrl

Sets the Base URL for image resources, used for automatically handling relative path images.

```typescript
import { setBaseUrl } from "fluekit";

setBaseUrl("https://cdn.example.com/assets/");
```
