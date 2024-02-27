---
title: datetime
id: datetime
---

# API Reference <a name="API Reference" id="api-reference"></a>


## Classes <a name="Classes" id="Classes"></a>

### Datetime <a name="Datetime" id="@winglang/sdk.std.Datetime"></a>

- *Implements:* <a href="#@winglang/sdk.std.ILiftable">ILiftable</a>

Represents a local or UTC date object.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Datetime.toIso">toIso</a></code> | Returns ISO-8601 string. |
| <code><a href="#@winglang/sdk.std.Datetime.toUtc">toUtc</a></code> | Returns a Datetime represents the same date in utc. |

---

##### `toIso` <a name="toIso" id="@winglang/sdk.std.Datetime.toIso"></a>

```wing
toIso(): str
```

Returns ISO-8601 string.

##### `toUtc` <a name="toUtc" id="@winglang/sdk.std.Datetime.toUtc"></a>

```wing
toUtc(): datetime
```

Returns a Datetime represents the same date in utc.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.Datetime.fromComponents">fromComponents</a></code> | Create a Datetime from Datetime components. |
| <code><a href="#@winglang/sdk.std.Datetime.fromDate">fromDate</a></code> | Create a Datetime from a JavaScript Date object. |
| <code><a href="#@winglang/sdk.std.Datetime.fromIso">fromIso</a></code> | Create a Datetime from an ISO-8601 string. |
| <code><a href="#@winglang/sdk.std.Datetime.systemNow">systemNow</a></code> | Create a Datetime from local system timezone. |
| <code><a href="#@winglang/sdk.std.Datetime.utcNow">utcNow</a></code> | Create a Datetime from UTC timezone. |

---

##### `fromComponents` <a name="fromComponents" id="@winglang/sdk.std.Datetime.fromComponents"></a>

```wing
datetime.fromComponents(c: DatetimeComponents);
```

Create a Datetime from Datetime components.

###### `c`<sup>Required</sup> <a name="c" id="@winglang/sdk.std.Datetime.fromComponents.parameter.c"></a>

- *Type:* <a href="#@winglang/sdk.std.DatetimeComponents">DatetimeComponents</a>

DatetimeComponents.

---

##### `fromDate` <a name="fromDate" id="@winglang/sdk.std.Datetime.fromDate"></a>

```wing
datetime.fromDate(date: datetime);
```

Create a Datetime from a JavaScript Date object.

###### `date`<sup>Required</sup> <a name="date" id="@winglang/sdk.std.Datetime.fromDate.parameter.date"></a>

- *Type:* datetime

The JavaScript Date object.

---

##### `fromIso` <a name="fromIso" id="@winglang/sdk.std.Datetime.fromIso"></a>

```wing
datetime.fromIso(iso: str);
```

Create a Datetime from an ISO-8601 string.

###### `iso`<sup>Required</sup> <a name="iso" id="@winglang/sdk.std.Datetime.fromIso.parameter.iso"></a>

- *Type:* str

ISO-8601 string.

---

##### `systemNow` <a name="systemNow" id="@winglang/sdk.std.Datetime.systemNow"></a>

```wing
datetime.systemNow();
```

Create a Datetime from local system timezone.

##### `utcNow` <a name="utcNow" id="@winglang/sdk.std.Datetime.utcNow"></a>

```wing
datetime.utcNow();
```

Create a Datetime from UTC timezone.

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.Datetime.property.dayOfMonth">dayOfMonth</a></code> | <code>num</code> | Returns the day of month in the local machine time or in utc (1 - 31). |
| <code><a href="#@winglang/sdk.std.Datetime.property.dayOfWeek">dayOfWeek</a></code> | <code>num</code> | Returns the day in month of the local machine time or in utc (0 - 6). |
| <code><a href="#@winglang/sdk.std.Datetime.property.hours">hours</a></code> | <code>num</code> | Returns the hour of the local machine time or in utc. |
| <code><a href="#@winglang/sdk.std.Datetime.property.min">min</a></code> | <code>num</code> | Returns the minute of the local machine time or in utc. |
| <code><a href="#@winglang/sdk.std.Datetime.property.month">month</a></code> | <code>num</code> | Returns the month of the local machine time or in utc (0 - 11). |
| <code><a href="#@winglang/sdk.std.Datetime.property.ms">ms</a></code> | <code>num</code> | Returns the milliseconds of the local machine time or in utc  *. |
| <code><a href="#@winglang/sdk.std.Datetime.property.sec">sec</a></code> | <code>num</code> | Returns the seconds of the local machine time or in utc. |
| <code><a href="#@winglang/sdk.std.Datetime.property.timestamp">timestamp</a></code> | <code>num</code> | Return a timestamp of non-leap year seconds since epoch. |
| <code><a href="#@winglang/sdk.std.Datetime.property.timestampMs">timestampMs</a></code> | <code>num</code> | Return a timestamp of non-leap year milliseconds since epoch. |
| <code><a href="#@winglang/sdk.std.Datetime.property.timezone">timezone</a></code> | <code>num</code> | Returns the offset in minutes from UTC. |
| <code><a href="#@winglang/sdk.std.Datetime.property.year">year</a></code> | <code>num</code> | Returns the year of the local machine time or in utc. |

---

##### `dayOfMonth`<sup>Required</sup> <a name="dayOfMonth" id="@winglang/sdk.std.Datetime.property.dayOfMonth"></a>

```wing
dayOfMonth: num;
```

- *Type:* num

Returns the day of month in the local machine time or in utc (1 - 31).

---

##### `dayOfWeek`<sup>Required</sup> <a name="dayOfWeek" id="@winglang/sdk.std.Datetime.property.dayOfWeek"></a>

```wing
dayOfWeek: num;
```

- *Type:* num

Returns the day in month of the local machine time or in utc (0 - 6).

---

##### `hours`<sup>Required</sup> <a name="hours" id="@winglang/sdk.std.Datetime.property.hours"></a>

```wing
hours: num;
```

- *Type:* num

Returns the hour of the local machine time or in utc.

---

##### `min`<sup>Required</sup> <a name="min" id="@winglang/sdk.std.Datetime.property.min"></a>

```wing
min: num;
```

- *Type:* num

Returns the minute of the local machine time or in utc.

---

##### `month`<sup>Required</sup> <a name="month" id="@winglang/sdk.std.Datetime.property.month"></a>

```wing
month: num;
```

- *Type:* num

Returns the month of the local machine time or in utc (0 - 11).

---

##### `ms`<sup>Required</sup> <a name="ms" id="@winglang/sdk.std.Datetime.property.ms"></a>

```wing
ms: num;
```

- *Type:* num

Returns the milliseconds of the local machine time or in utc  *.

---

##### `sec`<sup>Required</sup> <a name="sec" id="@winglang/sdk.std.Datetime.property.sec"></a>

```wing
sec: num;
```

- *Type:* num

Returns the seconds of the local machine time or in utc.

---

##### `timestamp`<sup>Required</sup> <a name="timestamp" id="@winglang/sdk.std.Datetime.property.timestamp"></a>

```wing
timestamp: num;
```

- *Type:* num

Return a timestamp of non-leap year seconds since epoch.

---

##### `timestampMs`<sup>Required</sup> <a name="timestampMs" id="@winglang/sdk.std.Datetime.property.timestampMs"></a>

```wing
timestampMs: num;
```

- *Type:* num

Return a timestamp of non-leap year milliseconds since epoch.

---

##### `timezone`<sup>Required</sup> <a name="timezone" id="@winglang/sdk.std.Datetime.property.timezone"></a>

```wing
timezone: num;
```

- *Type:* num

Returns the offset in minutes from UTC.

---

##### `year`<sup>Required</sup> <a name="year" id="@winglang/sdk.std.Datetime.property.year"></a>

```wing
year: num;
```

- *Type:* num

Returns the year of the local machine time or in utc.

---


## Structs <a name="Structs" id="Structs"></a>

### DatetimeComponents <a name="DatetimeComponents" id="@winglang/sdk.std.DatetimeComponents"></a>

Interface that is used for setting Datetime date.

#### Initializer <a name="Initializer" id="@winglang/sdk.std.DatetimeComponents.Initializer"></a>

```wing
let DatetimeComponents = DatetimeComponents{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.DatetimeComponents.property.day">day</a></code> | <code>num</code> | Day. |
| <code><a href="#@winglang/sdk.std.DatetimeComponents.property.hour">hour</a></code> | <code>num</code> | Hours. |
| <code><a href="#@winglang/sdk.std.DatetimeComponents.property.min">min</a></code> | <code>num</code> | Minutes. |
| <code><a href="#@winglang/sdk.std.DatetimeComponents.property.month">month</a></code> | <code>num</code> | Month. |
| <code><a href="#@winglang/sdk.std.DatetimeComponents.property.ms">ms</a></code> | <code>num</code> | Milliseconds. |
| <code><a href="#@winglang/sdk.std.DatetimeComponents.property.sec">sec</a></code> | <code>num</code> | Seconds. |
| <code><a href="#@winglang/sdk.std.DatetimeComponents.property.tz">tz</a></code> | <code>num</code> | Timezone offset in minutes from UTC. |
| <code><a href="#@winglang/sdk.std.DatetimeComponents.property.year">year</a></code> | <code>num</code> | Year. |

---

##### `day`<sup>Required</sup> <a name="day" id="@winglang/sdk.std.DatetimeComponents.property.day"></a>

```wing
day: num;
```

- *Type:* num

Day.

---

##### `hour`<sup>Required</sup> <a name="hour" id="@winglang/sdk.std.DatetimeComponents.property.hour"></a>

```wing
hour: num;
```

- *Type:* num

Hours.

---

##### `min`<sup>Required</sup> <a name="min" id="@winglang/sdk.std.DatetimeComponents.property.min"></a>

```wing
min: num;
```

- *Type:* num

Minutes.

---

##### `month`<sup>Required</sup> <a name="month" id="@winglang/sdk.std.DatetimeComponents.property.month"></a>

```wing
month: num;
```

- *Type:* num

Month.

---

##### `ms`<sup>Required</sup> <a name="ms" id="@winglang/sdk.std.DatetimeComponents.property.ms"></a>

```wing
ms: num;
```

- *Type:* num

Milliseconds.

---

##### `sec`<sup>Required</sup> <a name="sec" id="@winglang/sdk.std.DatetimeComponents.property.sec"></a>

```wing
sec: num;
```

- *Type:* num

Seconds.

---

##### `tz`<sup>Required</sup> <a name="tz" id="@winglang/sdk.std.DatetimeComponents.property.tz"></a>

```wing
tz: num;
```

- *Type:* num

Timezone offset in minutes from UTC.

---

##### `year`<sup>Required</sup> <a name="year" id="@winglang/sdk.std.DatetimeComponents.property.year"></a>

```wing
year: num;
```

- *Type:* num

Year.

---


