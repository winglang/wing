"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsiiClass = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
class JsiiClass {
    constructor(value) {
        this._field = value;
    }
    field() {
        return this._field;
    }
    publicMethod(arg) {
        return `Got ${arg}`;
    }
    protectedMethod(arg) {
        return `Got ${arg}`;
    }
}
exports.JsiiClass = JsiiClass;
_a = JSII_RTTI_SYMBOL_1;
JsiiClass[_a] = { fqn: "jsii-fixture.JsiiClass", version: "0.0.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxNQUFhLFNBQVM7SUFJcEIsWUFBWSxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxLQUFLO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxZQUFZLENBQUMsR0FBVztRQUM3QixPQUFPLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVTLGVBQWUsQ0FBQyxHQUFXO1FBQ25DLE9BQU8sT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDOztBQWxCSCw4QkFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSnNpaUNsYXNzIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmllbGQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fZmllbGQgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9maWVsZDtcbiAgfVxuXG4gIHB1YmxpYyBwdWJsaWNNZXRob2QoYXJnOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYEdvdCAke2FyZ31gO1xuICB9XG5cbiAgcHJvdGVjdGVkIHByb3RlY3RlZE1ldGhvZChhcmc6IHN0cmluZykge1xuICAgIHJldHVybiBgR290ICR7YXJnfWA7XG4gIH1cbn1cbiJdfQ==