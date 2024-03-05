---
title: duration
id: duration
---

# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### Duration <a name="Duration" id="@winglang/sdk.std.Duration"></a>

- *Implements:* <a href="#@winglang/sdk.std.ILiftable">ILiftable</a>

Represents a length of time.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Duration.fromDays">fromDays</a></code> | Create a Duration representing an amount of days. |
| <code><a href="#@winglang/sdk.std.Duration.fromHours">fromHours</a></code> | Create a Duration representing an amount of hours. |
| <code><a href="#@winglang/sdk.std.Duration.fromMilliseconds">fromMilliseconds</a></code> | Create a Duration representing an amount of milliseconds. |
| <code><a href="#@winglang/sdk.std.Duration.fromMinutes">fromMinutes</a></code> | Create a Duration representing an amount of minutes. |
| <code><a href="#@winglang/sdk.std.Duration.fromMonths">fromMonths</a></code> | Create a Duration representing an amount of months. |
| <code><a href="#@winglang/sdk.std.Duration.fromSeconds">fromSeconds</a></code> | Create a Duration representing an amount of seconds. |
| <code><a href="#@winglang/sdk.std.Duration.fromYears">fromYears</a></code> | Create a Duration representing an amount of years. |

---

##### `fromDays` <a name="fromDays" id="@winglang/sdk.std.Duration.fromDays"></a>

```wing
duration.fromDays(amount: num);
```

Create a Duration representing an amount of days.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromDays.parameter.amount"></a>

- *Type:* num

the amount of Days the `Duration` will represent.

---

##### `fromHours` <a name="fromHours" id="@winglang/sdk.std.Duration.fromHours"></a>

```wing
duration.fromHours(amount: num);
```

Create a Duration representing an amount of hours.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromHours.parameter.amount"></a>

- *Type:* num

the amount of Hours the `Duration` will represent.

---

##### `fromMilliseconds` <a name="fromMilliseconds" id="@winglang/sdk.std.Duration.fromMilliseconds"></a>

```wing
duration.fromMilliseconds(amount: num);
```

Create a Duration representing an amount of milliseconds.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromMilliseconds.parameter.amount"></a>

- *Type:* num

the amount of Milliseconds the `Duration` will represent.

---

##### `fromMinutes` <a name="fromMinutes" id="@winglang/sdk.std.Duration.fromMinutes"></a>

```wing
duration.fromMinutes(amount: num);
```

Create a Duration representing an amount of minutes.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromMinutes.parameter.amount"></a>

- *Type:* num

the amount of Minutes the `Duration` will represent.

---

##### `fromMonths` <a name="fromMonths" id="@winglang/sdk.std.Duration.fromMonths"></a>

```wing
duration.fromMonths(amount: num);
```

Create a Duration representing an amount of months.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromMonths.parameter.amount"></a>

- *Type:* num

the amount of Months the `Duration` will represent.

---

##### `fromSeconds` <a name="fromSeconds" id="@winglang/sdk.std.Duration.fromSeconds"></a>

```wing
duration.fromSeconds(amount: num);
```

Create a Duration representing an amount of seconds.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromSeconds.parameter.amount"></a>

- *Type:* num

the amount of Seconds the `Duration` will represent.

---

##### `fromYears` <a name="fromYears" id="@winglang/sdk.std.Duration.fromYears"></a>

```wing
duration.fromYears(amount: num);
```

Create a Duration representing an amount of years.

###### `amount`<sup>Required</sup> <a name="amount" id="@winglang/sdk.std.Duration.fromYears.parameter.amount"></a>

- *Type:* num

the amount of Years the `Duration` will represent.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Duration.property.days">days</a></code> | <code>num</code> | Return the total number of days in this Duration. |
| <code><a href="#@winglang/sdk.std.Duration.property.hours">hours</a></code> | <code>num</code> | Return the total number of hours in this Duration. |
| <code><a href="#@winglang/sdk.std.Duration.property.milliseconds">milliseconds</a></code> | <code>num</code> | Return the total number of milliseconds in this Duration. |
| <code><a href="#@winglang/sdk.std.Duration.property.minutes">minutes</a></code> | <code>num</code> | Return the total number of minutes in this Duration. |
| <code><a href="#@winglang/sdk.std.Duration.property.months">months</a></code> | <code>num</code> | Return the total number of months in this Duration. |
| <code><a href="#@winglang/sdk.std.Duration.property.seconds">seconds</a></code> | <code>num</code> | Return the total number of seconds in this Duration. |
| <code><a href="#@winglang/sdk.std.Duration.property.years">years</a></code> | <code>num</code> | Return the total number of years in this Duration. |

---

##### `days`<sup>Required</sup> <a name="days" id="@winglang/sdk.std.Duration.property.days"></a>

```wing
days: num;
```

- *Type:* num

Return the total number of days in this Duration.

---

##### `hours`<sup>Required</sup> <a name="hours" id="@winglang/sdk.std.Duration.property.hours"></a>

```wing
hours: num;
```

- *Type:* num

Return the total number of hours in this Duration.

---

##### `milliseconds`<sup>Required</sup> <a name="milliseconds" id="@winglang/sdk.std.Duration.property.milliseconds"></a>

```wing
milliseconds: num;
```

- *Type:* num

Return the total number of milliseconds in this Duration.

---

##### `minutes`<sup>Required</sup> <a name="minutes" id="@winglang/sdk.std.Duration.property.minutes"></a>

```wing
minutes: num;
```

- *Type:* num

Return the total number of minutes in this Duration.

---

##### `months`<sup>Required</sup> <a name="months" id="@winglang/sdk.std.Duration.property.months"></a>

```wing
months: num;
```

- *Type:* num

Return the total number of months in this Duration.

---

##### `seconds`<sup>Required</sup> <a name="seconds" id="@winglang/sdk.std.Duration.property.seconds"></a>

```wing
seconds: num;
```

- *Type:* num

Return the total number of seconds in this Duration.

---

##### `years`<sup>Required</sup> <a name="years" id="@winglang/sdk.std.Duration.property.years"></a>

```wing
years: num;
```

- *Type:* num

Return the total number of years in this Duration.

---




