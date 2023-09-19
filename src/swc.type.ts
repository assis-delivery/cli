/**
 * Schema for the swc configuration file
 */
export type SwcConfigurationSchema = SWCOptions[] | SWCOptions;
export type FeatureOrModule =
  | string
  | (
      | 'transform-template-literals'
      | 'transform-literals'
      | 'transform-function-name'
      | 'transform-arrow-functions'
      | 'transform-block-scoped-functions'
      | 'transform-classes'
      | 'transform-object-super'
      | 'transform-shorthand-properties'
      | 'transform-duplicate-keys'
      | 'transform-computed-properties'
      | 'transform-for-of'
      | 'transform-sticky-regex'
      | 'transform-dotall-regex'
      | 'transform-unicode-regex'
      | 'transform-spread'
      | 'transform-parameters'
      | 'transform-destructuring'
      | 'transform-block-scoping'
      | 'transform-typeof-symbol'
      | 'transform-new-target'
      | 'transform-regenerator'
      | 'transform-exponentiation-operator'
      | 'transform-async-to-generator'
      | 'proposal-async-generator-functions'
      | 'proposal-object-rest-spread'
      | 'proposal-unicode-property-regex'
      | 'proposal-json-strings'
      | 'proposal-optional-catch-binding'
      | 'transform-named-capturing-groups-regex'
      | 'transform-member-expression-literals'
      | 'transform-property-literals'
      | 'transform-reserved-words'
      | 'proposal-nullish-coalescing-operator'
      | 'proposal-optional-chaining'
      | 'proposal-class-properties'
      | 'proposal-numeric-separator'
      | 'proposal-private-methods'
      | 'transform-unicode-escapes'
    );
/**
 * Query
 */
export type EnvQuery = string | string[];
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "".
 */
export type EnvVersion = string | number;
/**
 * QueryOrVersion
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "".
 */
export type EnvQueryOrVersion = EnvQuery | EnvVersion;
export type FileMatcher = string | FileMatcher[];

/**
 * Defines an entry point
 */
export interface SWCOptions {
  env?: {
    mode?: 'usage' | 'entry';
    debug?: boolean;
    dynamicImport?: boolean;
    loose?: boolean;
    /**
     * Skipped es-features. e.g.: 'core-js/modules/foo'
     */
    skip?: string[];
    include?: FeatureOrModule[];
    exclude?: FeatureOrModule[];
    coreJs?: string;
    targets?:
      | EnvQuery
      | {
          esmodules?: boolean;
        }
      | {
          [k: string]: EnvVersion;
        }
      | {
          [k: string]: EnvQueryOrVersion;
        };
    shippedProposals?: boolean;
    forceAllTransforms?: boolean;
    bugfixes?: boolean;
  };
  /**
   * Matches the files to include
   */
  test?: string | FileMatcher[];
  /**
   * Matches the files to exclude
   */
  exclude?: string | FileMatcher[];
  /**
   * If true, swc will minify the output
   */
  minify?: boolean;
  /**
   * Describes how swc will transpile the input
   */
  module?: {
    type: 'commonjs' | 'amd' | 'umd' | 'es6';
    /**
     * If true, the __esModule property won't be added to the export
     */
    strict?: boolean;
    /**
     * If true, swc emits the 'use strict' directive
     */
    strictMode?: boolean;
    lazy?: boolean | string[];
    /**
     * Disable the use of interopRequireDefault
     */
    noInterop?: boolean;
    /**
     * If emitting amd-modules and specified, swc emits a named amd module
     */
    moduleId?: string;
    globals?: StringStringMap;
  };
  $schema?: string;
  /**
   * Main Jsc configuration
   */
  jsc?: {
    /**
     * Configures the parser
     */
    parser?:
      | {
          syntax?: 'ecmascript';
          /**
           * If true, transform jsx
           */
          jsx?: boolean;
          /**
           * Support numeric separator proposal (Stage 3)
           */
          numericSeparator?: boolean;
          /**
           * Support private class properties
           */
          classPrivateProperty?: boolean;
          /**
           * Support private class methods
           */
          privateMethod?: boolean;
          /**
           * Support class properties
           */
          classProperty?: boolean;
          /**
           * Support function bind expression
           */
          functionBind?: boolean;
          /**
           * Enable decorators
           */
          decorators?: boolean;
          decoratorsBeforeExport?: boolean;
          exportDefaultFrom?: boolean;
          exportNamespaceFrom?: boolean;
          dynamicImport?: boolean;
          nullishCoalescing?: boolean;
          optionalChaining?: boolean;
          importMeta?: boolean;
          topLevelAwait?: boolean;
          importAssertions?: boolean;
        }
      | {
          syntax?: 'typescript';
          /**
           * If true, transform tsx
           */
          tsx?: boolean;
          /**
           * If true, transform decorators
           */
          decorators?: boolean;
          dynamicImport?: boolean;
          /**
           * [DISABLED] If true, emit .d.ts files. This flag is currently skipped by serde.
           */
          dts?: boolean;
          /**
           * [DISABLED] This flag is currently skipped by serde.
           */
          noEarlyErrors?: boolean;
          importAssertions?: boolean;
        };
    transform?: {
      react?: {
        development?: boolean;
        pragma?: string;
        pragmaFrag?: string;
        refresh?: boolean;
        runtime?: 'automatic' | 'classic';
        throwIfNamespace?: boolean;
        useBuiltins?: boolean;
      };
      constModules?: {
        globals?: {
          [k: string]: StringStringMap;
        };
      };
      optimizer?: {
        globals?: {
          vars?: StringStringMap;
          envs?: string[];
        };
        jsonify?: {
          minCost?: number;
        };
      };
      legacyDecorator?: boolean;
      /**
       * If true, decorator metadata is emitted. Make sure "Reflect" is present.
       */
      decoratorMetadata?: boolean;
      /**
       * If false, the old behaviour is used and _defineProperty is not generated for class properties.
       * https://swc.rs/docs/configuration/compilation#jsctransformusedefineforclassfields
       */
      useDefineForClassFields?: boolean;
      hidden?: {
        jest?: boolean;
      };
    };
    /**
     * If true, this option will reduce the filesize by importing from an external module
     */
    externalHelpers?: boolean;
    /**
     * If true, all comments will be preserved during compilation
     */
    preserveAllComments?: boolean;
    /**
     * Specifies the target environment
     */
    target?:
      | 'es3'
      | 'es5'
      | 'es2015'
      | 'es2016'
      | 'es2017'
      | 'es2018'
      | 'es2019'
      | 'es2020'
      | 'es2021'
      | 'es2022'
      | 'esnext';
    /**
     * If true, swc generates more efficient code
     */
    loose?: boolean;
    /**
     * Preserve original class names
     * https://swc.rs/docs/configuration/compilation#jsckeepclassnames
     */
    keepClassNames?: boolean;
    /**
     * Should reflect "paths" property in project's tsconfig.json . See https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
     */
    paths?: {
      [k: string]: unknown;
    };
    /**
     * Should reflect "baseUrl" property in project's tsconfig.json . See https://www.typescriptlang.org/docs/handbook/module-resolution.html#base-url
     */
    baseUrl?: string;
    minify?: MinificationOptions;
    experimental?: ExperimentalOptions;
  };
  skipHelperInjection?: boolean;
  disableHygiene?: boolean;
  disableFixer?: boolean;
  cwd?: string;
  filename?: string;
  root?: string;
  swcrc?: boolean;
  envName?: string;
  sourceFileName?: string;
  sourceRoot?: string;
  isModule?: boolean;
  globalMark?: number;
  callerOptions?: {
    name?: string;
  };
  configFile?: string | boolean;
  rootMode?: 'root' | 'upward' | 'upward-optional';
  inputSourceMap?: string | boolean;
  sourceMaps?: string | boolean;
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "".
 */
export interface StringStringMap {
  /**
   * This interface was referenced by `StringStringMap`'s JSON-Schema definition
   * via the `patternProperty` "".
   */
  [k: string]: string;
}
/**
 * Minification options
 * https://swc.rs/docs/configuration/minification
 */
export interface MinificationOptions {
  [k: string]: unknown;
}
/**
 * Experimental options
 * https://swc.rs/docs/configuration/compilation#jscexperimental
 */
export interface ExperimentalOptions {
  /**
   * Preserve import assertions if true. This is experimental because import assertions are not covered by ecmascript specifications yet.
   */
  keepImportAssertions?: boolean;
  /**
   * A list of plugins to load
   */
  plugins?: [
    [
      string,
      {
        [k: string]: unknown;
      },
    ],
    ...[
      string,
      {
        [k: string]: unknown;
      },
    ][],
  ];
}