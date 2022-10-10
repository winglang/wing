bring cloud;

resource CachableFunction extends cloud.Function {
    _func: cloud.Function;
    _cache: cloud.Bucket;

    init(inflight: ~(event: any): any, props: cloud.FunctionProps) {
        super(inflight, props);
        this._cache = new cloud.Bucket();
    }

    public override ~invoke(event: any) {
        let key = hashof(event);
        let cached = this._cache.try_get(key);
        if (cached != nil) {
            return cached;
        }
        let result = super.invoke(event);
        this._cache.set(key, result);
        return result;
    }
}

let handler = (arg1: num) ~> {
    // do expensive computations
    return arg1 * 2;
};

let cachedHandler = new CachableFunction(handler);
