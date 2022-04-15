/**
 * 场景: 抽离Switch -> case || Map映射处理条件匹配时 编程范式
 */
type TMatcher<T> = string | number | ((input: T) => boolean);
type TResolver<T, S, K> = (payload: T, other?: S) => K;

export class MatchManager<T extends any, S, K> {
  private flagID = 0;

  private defaultValue: K | undefined = undefined;

  private matcher: {
    id: number;
    matcher: TMatcher<T>;
    resolver: TResolver<T, S, K>;
  }[] = [];

  constructor(defaultValue: K) {
    this.defaultValue = defaultValue;
  }

  add(
    matcher: TMatcher<T>,
    resolver: TResolver<T, S, K>
  ): number {
    const matcherID = ++this.flagID;

    this.matcher.push({
      id: matcherID,
      matcher,
      resolver
    });

    return matcherID;
  }

  resolve(input: T, payload?: S): K | undefined {
    for (let i = 0; i < this.matcher.length; i++) {
      const {
        matcher,
        resolver
      } = this.matcher[i];

      // 函数匹配
      if (typeof matcher === 'function') {
        if (matcher(input)) {
          return resolver(input, payload);
        }
        continue;
      }

      // 引用或值匹配
      if (matcher === input) {
        return resolver(input, payload);
      }
      continue;
    }

    return this.defaultValue;
  }
}

export default MatchManager;
