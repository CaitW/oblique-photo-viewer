module.exports = {
  extends: ["prettier"],
  rules: {
    // And why they're best practice (alphabetized).
    "accessor-pairs": [2, { getWithoutSet: true }], // omission is usually by mistake.
    "array-callback-return": 2, // omission is usually by mistake.
    "arrow-body-style": [2, "as-needed"], // improves consistency and readability.
    "block-scoped-var": 2, // can behave unexpectedly due to variable hoisting.
    "callback-return": [2, ["callback", "cb", "next"]], // usually returns control to cb, so best to return out of function as well.
    camelcase: 0, // camelCase is JS convention, and this still allows capcase constants.*/
    complexity: 1, // code with high cyclomatic complexity is difficult to reason about.
    "consistent-return": 2, // reduces ambiguity about what gets returned.
    "consistent-this": [2, "context"], // enforces a standard var for capturing context (which should be done sparingly).
    "constructor-super": 2, // catches runtime syntax errors.
    curly: 2, // reduces ambiguity around blocks and line breaks.
    "default-case": 2, // not having default (and break) lead to unexpected results.
    "dot-notation": 2, // easier to read.
    eqeqeq: 2, // avoids unexpected type coercion.
    "func-names": 2, // having named functions makes following stack traces much easier.
    "func-style": [0, "declaration"], // differentiates funcs from consts; hoisting allows more readable code ordering.
    "global-require": 2, // avoid unexpected sync file load.
    "guard-for-in": 2, // protects against looping over props up prototype chain.
    "handle-callback-err": [2, "^.*(e|E)rr"], // often omitted in error.
    "id-blacklist": 0, // will add variable names to this list if abused.
    "id-length": 0, // variable naming is difficult enough without limits.
    "id-match": 0, // covered by camelCase.
    "init-declarations": 2, // not assigning an initialized variable should be explicit, not a mistake.
    "jsx-quotes": 2, // improves consistency; more common to have to quote single quotes than double so double is default.
    "linebreak-style": [2, "unix"], // improves consistency; prevents windows users from introducing \r.
    "max-depth": [1, 4], // deeply nested code can be difficult to read.
    "max-nested-callbacks": [1, 2], // a sign that the nested code should be refactored out.
    "max-params": 0, // better to have many params than obscure them with a config object.
    "newline-after-var": 0, // improves consistency; concise code gives reader more context.
    "newline-before-return": 0, // vertical space is too precious to be wasted.
    "no-alert": 2, // alerts are annoying.
    "no-array-constructor": 2, // can do surprising things; better to use [].
    "no-bitwise": 2, // these are usually typos; can be difficult to reason about.
    "no-caller": 2, // deprecated.
    "no-case-declarations": 0, // can lead to unexpected behavior.
    "no-catch-shadow": 2, // causes a bug in IE8.
    "no-class-assign": 2, // usually a typo.
    "no-cond-assign": 0, // usually typos.
    "no-console": 1, // for debugging only; shouldn't be committed.
    "no-const-assign": 2, // catches runtime syntax errors.
    "no-constant-condition": 0, // unnecessary; usually a typo.
    "no-continue": 2, // makes reasoning about loops more difficult.
    "no-control-regex": 2, // usually a typo.
    "no-debugger": 1, // for debugging only; shouldn't be committed.
    "no-delete-var": 2, // only properties should be deleted.
    "no-div-regex": 0, // regex are difficult enough; also operator-assignment disallows /= operator.
    "no-dupe-args": 1, // shadowing increases ambiguity.
    "no-dupe-class-members": 2, // can behave unexpectedly, probably a typo.
    "no-duplicate-case": 2, // almost certainly a mistake.
    "no-duplicate-imports": 2, // should be consolidated for brevity.
    "no-else-return": 0, // explicit conditional paths are better than implicit.
    "no-empty": 2, // probably a mistake.
    "no-empty-character-class": 2, // probably a typo.
    "no-empty-function": 1, // probably a mistake.
    "no-empty-pattern": 2, // looks like object but is in fact noop.
    "no-eq-null": 2, // use strict equality.
    "no-eval": 2, // eval is often unsafe and performs poorly.
    "no-ex-assign": 2, // overwriting params is usually bad; can obscure errors.
    "no-extend-native": 2, // can cause unexpected behavior for other devs.
    "no-extra-bind": 2, // removes useless code.
    "no-extra-boolean-cast": 2, // unnecessary.
    "no-extra-label": 2, // don't use labels
    "no-fallthrough": 2, // catches mistakes that lead to unexpected behavior.
    "no-floating-decimal": 2, // looks too much like dot operator.
    "no-func-assign": 2, // probably a typo.
    "no-implicit-coercion": 2, // avoids fancy coercion tricks that inhibit readability.
    "no-implicit-globals": 0, // modules make this rule unnecessary.
    "no-implied-eval": 2, // eval is often unsafe and performs poorly.
    "no-inline-comments": 0, // helps prevent post-refactor orphaned comments.
    "no-invalid-regexp": 2, // the more checks on regex correctness the better.
    "no-inner-declarations": 2, // avoids unexpected behavior.
    "no-irregular-whitespace": 1, // improves consistency.
    "no-iterator": 2, // this feature is obsolete and not widely supported.
    "no-label-var": 2, // a bad feature related to loop control flow, like GOTO.
    "no-labels": 2, // a bad feature related to loop control flow, like GOTO.
    "no-lone-blocks": 2, // unless in es6, these are just useless clutter.
    "no-lonely-if": 2, // extra-verbose and unusual.
    "no-loop-func": 2, // functions in loops are difficult to reason about.
    "no-magic-numbers": [2, { enforceConst: true, ignore: [0, 1, 2, -1] }], // what the number represents gets lost.
    "no-mixed-requires": 1, // group requires and seperate from other init for clearer code.
    "no-multi-str": 2, // use newline chars or template strings instead.
    "no-native-reassign": 2, // can cause unexpected behavior for other devs.
    "no-negated-condition": 2, // improves reasonability.
    "no-negated-in-lhs": 2, // reduces ambiguity and typos.
    "no-nested-ternary": 2, // improves reasonability.
    "no-new": 2, // using new for side effects is bad because side effects are bad and OO is bad.
    "no-new-func": 2, // eval is often unsafe and performs poorly.
    "no-new-object": 2, // use more concise {} instead.
    "no-new-require": 2, // unusual; just use require.
    "no-new-symbol": 2, // should be called as a function without new.
    "no-new-wrappers": 2, // does not do what it looks like it does.
    "no-obj-calls": 2, // part of the spec.
    "no-octal": 2, // can be confusing.
    "no-octal-escape": 2, // deprecated.
    "no-param-reassign": 0, // useful for guarding a function.
    "no-path-concat": 2, // breaks for non-unix system.
    "no-plusplus": 2, // may cause semicolon issues, and can be expressed more explicitly.
    "no-process-env": 2, // global deps are bad; better to use config files.
    "no-process-exit": 2, // too drastic; almost always better to throw and handle.
    "no-proto": 2, // deprecated.
    "no-redeclare": [2, { builtinGlobals: true }], // probably a mistake; should use const/let instead anyway.
    "no-regex-spaces": 2, // probably a typo.
    "no-restricted-globals": 0, // not (yet) necessary.
    "no-restricted-imports": 0, // not (yet) necessary.
    "no-restricted-modules": 0, // not (yet) necessary.
    "no-restricted-syntax": [0, "TryStatement"], // try-catch makes tracing errors difficult (see http://j.mp/thriftthrow).
    "no-return-assign": [2, "always"], // can cover up typos.
    "no-script-url": 2, // eval is often unsafe and performs poorly.
    "no-self-assign": 2, // no effect; probably a typo.
    "no-self-compare": 2, // usually a typo; better to use isNaN.
    "no-sequences": 2, // usually a typo; obscures side effects.
    "no-shadow": 2, // difficult to read, limits access to higher scope vars.
    "no-shadow-restricted-names": 2, // should not mess with restricted.
    "no-sparse-arrays": 2, // usually typos.
    "no-sync": 2, // blocks single thread; use async.
    "no-ternary": 0, // ternaries more concise and more strict than if/else.
    "no-this-before-super": 2, // catches a reference error.
    "no-throw-literal": 2, // be consistent about only throwing Error objects.
    "no-undef": 2, // catches ReferenceErrors.
    "no-undef-init": 2, // unnecessary.
    "no-undefined": 2, // better to check typeof
    "no-underscore-dangle": 2, // should not rely on variable name to reason about scoping, as it may change.
    "no-unmodified-loop-condition": 2, // possible infinite loop; probably a mistake.
    "no-unneeded-ternary": 2, // improves consistency and readability.
    "no-unreachable": 2, // helps keep things clean during refactoring.
    "no-unsafe-finally": 2, // leads to unexpected behavior.
    "no-unused-expressions": 2, // usually a typo; has o effect.
    "no-unused-labels": 2, // don't use labels.
    "no-unused-vars": 2, // probably a mistake.
    "no-use-before-define": [2, { functions: false }], // avoids temporal dead zone; functions below can improve readability.
    "no-useless-call": 2, // slower than normal invocation.
    "no-useless-computed-key": 2, // unnecessary; can cause confusion.
    "no-useless-concat": 2, // slower than static combination.
    "no-useless-constructor": 2, // unnecessary.
    "no-useless-escape": 2, // makes code easier to read.
    "no-var": 2, // const is best, and let is useful for counters, but they eclipse var's uses. #ES6only
    "no-void": 2, // unusual and unnecessary.
    "no-warning-comments": 1, // warning comments should be addressed before merge (or moved out of code).
    "no-with": 2, // can add unexpected variables to scope.
    "object-shorthand": 2, // increases consistency. #ES6only
    "one-var": [2, "never"], // grouped statement types are more consistent and readable.
    "operator-assignment": [2, "never"], // better to be explicit about what is happening than relying on shorthand.
    "prefer-arrow-callback": 2, // increases readability and consistency.
    "prefer-const": 2, // better to be explicit about what is expected to change.
    "prefer-rest-params": 2, // easier to read than slicing args. #ES6only
    // "prefer-template": 2, // string concatenation is slow and error-prone. #ES6only
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: false }],
    radix: 2, // should be explicit about what kind of int is being parsed.
    "react/display-name": 1, // components should have names to make stack traces easier to read.
    "react/forbid-prop-types": 2, // should use arrayOf and shape to be more explicit about array and object prop requirements. #TODO enable this rule.
    "react/jsx-boolean-value": 2, // better to be explicit about a boolean value.
    "react/jsx-handler-names": [
      0,
      {
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "on"
      }
    ],
    "react/jsx-key": 2, // avoid warning.
    "react/jsx-no-bind": 2, // performance issue, happens on every render. #TODO enable this rule.
    "react/jsx-no-duplicate-props": 2, // usually mistakes.
    "react/jsx-no-literals": 0, // prevents unexpected behavior.
    "react/jsx-no-target-blank": 2, // prevents security vulnerability.
    "react/jsx-no-undef": 2, // catches syntax errors.
    "react/jsx-pascal-case": 2, // improves consistency and readability.
    "react/jsx-uses-react": 2, // helps linter know that react is used by jsx.
    "react/jsx-uses-vars": 2, // unused variables are useless.
    "react/no-danger": 2, // protects against  html injection vulnerabilities.
    "react/no-deprecated": 2, // should stay up to date.
    "react/no-did-mount-set-state": 2, // will cause a multiple render calls.
    "react/no-did-update-set-state": 1, // will cause a multiple render calls.
    "react/no-direct-mutation-state": 2, // state mutation is incompatible with redux.
    "react/no-is-mounted": 2, // deprecated.
    "react/no-multi-comp": [2, { ignoreStateless: true }], // improves readability.
    "react/no-set-state": 2, // use redux to change state instead. #TODO enable this rule.*/
    "react/no-string-refs": 2, // deprecated. #TODO enable this rule.
    "react/no-unknown-property": 2, // can cause unexpected HTML errors.
    "react/prefer-es6-class": [1, "always"], // should use stateless functional components whenever possible.
    "react/prefer-stateless-function": 2, // should use stateless functional components whenever possible.
    "react/prop-types": 2, // validating inputs improves reusability.
    "react/react-in-jsx-scope": 2, // catches typos.
    "react/require-render-return": 2, // catches omission mistakes.
    "react/self-closing-comp": 2, // improves consistency and readability.
    "react/sort-comp": 2, // improves consistency, readability.
    "require-yield": 2, // omission is probably a mistake.
    "spaced-comment": 2, // improves consistency.
    "use-isnan": 2, // comparing to NaN can be difficult to reason about.
    "valid-jsdoc": 0, // not using jsdoc.
    "valid-typeof": 2, // there are ways to type-check, but will least prevent typos.
    "vars-on-top": 2, // best to have code agree with hoisting.
    yoda: 2 // improves readability and consistency.
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jasmine: true
  },
  plugins: ["react"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      arrowFunctions: true,
      binaryLiterals: true,
      blockBindings: true,
      classes: true,
      defaultParams: true,
      destructuring: true,
      forOf: true,
      generators: true,
      jsx: true,
      objectLiteralComputedProperties: true,
      objectLiteralDuplicateProperties: true,
      objectLiteralShorthandMethods: true,
      objectLiteralShorthandProperties: true,
      octalLiterals: true,
      regexUFlag: true,
      regexYFlag: true,
      restParams: true,
      spread: true,
      superInFunctions: true,
      templateStrings: true,
      unicodeCodePointEscapes: true,
      globalReturn: true,
      experimentalObjectRestSpread: true
    },
    sourceType: "module"
  },
  extends: "eslint:recommended",
  globals: {
    Generator: true
  }
}
