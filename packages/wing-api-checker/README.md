# Wing API checker

A CLI that can be used to check a Wing resource library for following best practices for API design.

## Installation

```bash
npm install -g wing-api-checker
```

## Future work

- API design guidelines document (TODO)
- Check naming of "props" interfaces
- Check for maximum number of arguments on methods
- Check that every resource has a "stateful" property
- Check that `onXxx` methods accept an `IFunction` / `IEventHandler` property, etc.
