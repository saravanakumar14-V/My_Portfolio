type EffectComponent = React.FC<Record<string, unknown>>;

class EffectRegistry {
  private static instance: EffectRegistry;
  private registry: Map<string, EffectComponent>;

  private constructor() {
    this.registry = new Map();
  }

  public static getInstance(): EffectRegistry {
    if (!EffectRegistry.instance) {
      EffectRegistry.instance = new EffectRegistry();
    }
    return EffectRegistry.instance;
  }

  public register(name: string, Component: EffectComponent) {
    if (this.registry.has(name)) {
      console.warn(`Effect "${name}" is already registered. Overwriting.`);
    }
    this.registry.set(name, Component);
  }

  public get(name: string): EffectComponent | undefined {
    return this.registry.get(name);
  }
}

export const effectRegistry = EffectRegistry.getInstance();
