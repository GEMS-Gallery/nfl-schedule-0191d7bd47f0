import Float "mo:base/Float";
import Text "mo:base/Text";
import Error "mo:base/Error";

actor Calculator {
  public func calculate(operation: Text, a: Float, b: Float) : async Float {
    switch (operation) {
      case ("+") { return a + b; };
      case ("-") { return a - b; };
      case ("*") { return a * b; };
      case ("/") {
        if (b == 0) {
          throw Error.reject("Division by zero");
        };
        return a / b;
      };
      case (_) {
        throw Error.reject("Invalid operation");
      };
    };
  };
}