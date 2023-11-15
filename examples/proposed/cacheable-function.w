bring cloud;

class CachableFunction extends cloud.Function {
    _func: cloud.Function;
    _cache: cloud.Bucket;

    new(inflight: inflight (event: any) => any, props: cloud.FunctionProps) {
        super(inflight, props);
        this._cache = new cloud.Bucket();
    }

    pub inflight invoke(event: any): any {
        let key = hashof(event);
        let cached = this._cache.try_get(key);
        if cached {
            return cached;
        }
        let result = super.invoke(event);
        this._cache.set(key, result);
        return result;
    }
}

let handler = inflight (arg1: num): num => {
    // do expensive computations
    return arg1 * 2;
};

let cachedHandler = new CachableFunction(handler);
