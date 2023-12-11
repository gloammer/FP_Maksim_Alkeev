const instancesMap = new Map<string, any>();

function Injectable(options: { key: string }): ClassDecorator {
  return function (target: any) {
    const instance = new target();

    instancesMap.set(options.key, instance);
  };
}

function Inject(key: string): PropertyDecorator {
  return function (target: any, propertyKey: string) {
    target[propertyKey] = instancesMap.get(key);
  };
}

@Injectable({ key: "HelloFromSeoul" })
class HelloFromSeoul {
  public message = "Hello from Seoul!";
}

@Injectable({ key: "HelloFromBangkok" })
class HelloFromBangkok {
  public message = "Hello from Bangkok!";
}

class Test {
  @Inject("HelloFromSeoul")
  public helloFromSeoul: HelloFromSeoul;

  @Inject("HelloFromBangkok")
  public helloFromBangkok: HelloFromBangkok;

  public printHelloFromSeoul(): void {
    console.log(this.helloFromSeoul.message);
  }

  public printHelloFromBangkok(): void {
    console.log(this.helloFromBangkok.message);
  }
}

const test = new Test();

test.printHelloFromSeoul();
test.printHelloFromBangkok();
