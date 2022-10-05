bring cloud;

resource CachableFunction {
    _func: cloud.Function;
    _cache: cloud.KeyValueStore;

    init(func: cloud.Function) {
        this._func = func;
        this._cache = new cloud.Bucket();
    }

    ~invoke(args: any) {
        let key = JSON.stringify(args);
        let cached = this._cache.try_get(key);
        if (cached != nil) {
            return cached;
        }
        let result = this._func.invoke(args);
        this._cache.set(key, result);
        return result;
    }
}

let handler = (arg1: num) ~> {
    // do expensive computations
    return arg1 * 2;
};

let cachedHandler = new CachableFunction(handler);

