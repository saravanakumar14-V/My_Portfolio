type SceneState = 'entering' | 'entered' | 'exiting' | 'exited';

type SceneObserver = (state: SceneState) => void;

class SceneManager {
  private static instance: SceneManager;
  private state: SceneState = 'entered';
  private observers: Set<SceneObserver> = new Set();
  
  // A master timeline to control full-page or full-section transitions

  private constructor() {}

  public static getInstance(): SceneManager {
    if (!SceneManager.instance) {
      SceneManager.instance = new SceneManager();
    }
    return SceneManager.instance;
  }

  public subscribe(observer: SceneObserver) {
    this.observers.add(observer);
    observer(this.state); // immediately notify current state
    return () => this.observers.delete(observer);
  }

  private notify() {
    this.observers.forEach(obs => obs(this.state));
  }

  public getState() {
    return this.state;
  }

  public async transitionOut(tl?: gsap.core.Timeline) {
    this.state = 'exiting';
    this.notify();
    
    if (tl) {
      await tl.play();
    }
    
    this.state = 'exited';
    this.notify();
  }

  public async transitionIn(tl?: gsap.core.Timeline) {
    this.state = 'entering';
    this.notify();

    if (tl) {
      await tl.play();
    }

    this.state = 'entered';
    this.notify();
  }
}

export const sceneManager = SceneManager.getInstance();
