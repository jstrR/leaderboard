## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

## FAQ

### Project architecture

Since the functionality and size of the project is limited, there is simply no reason to use more complex architecture methodologies like [FSD](https://feature-sliced.design/) or [Atomic Design](https://atomicdesign.bradfrost.com/).

### Stylings

Only Tailwind is used as requirement.

### Core logic

For simplicity and to save time, and despite the possible performance increase, I decided to resort the whole array and calculate the changed offset for each item instead of rotating the array -> detecting only those with changed offset -> running the animation.
