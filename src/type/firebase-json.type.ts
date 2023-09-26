interface DeploySettings {
  postdeploy?: string[] | string;
  predeploy?: string[] | string;
}

interface Emulator {
  host?: string;
  port?: number;
}

interface DatabaseInstance extends DeploySettings {
  instance?: string;
  rules: string;
  target?: string;
}

interface FirestoreInstance extends DeploySettings {
  database?: string;
  indexes?: string;
  rules?: string;
  target?: string;
}

interface FunctionsInstance extends DeploySettings {
  codebase?: string;
  ignore?: string[];
  runtime?:
    | 'nodejs10'
    | 'nodejs12'
    | 'nodejs14'
    | 'nodejs16'
    | 'nodejs18'
    | 'nodejs20';
  source?: string;
}

export interface FirebaseJson {
  $schema?: string;
  database?: DatabaseInstance | DatabaseInstance[];
  emulators?: {
    auth?: Emulator;
    database?: Emulator;
    eventarc?: Emulator;
    functions?: Emulator;
    firestore?: Emulator;
    pubsub?: Emulator;
    ui?: {
      enabled?: boolean;
      host?: string;
      port?: string | number;
    };
    singleProjectMode?: boolean;
  };
  extensions?: ExtensionsConfig;
  firestore?: FirestoreInstance | FirestoreInstance[];
  functions?: FunctionsInstance | FunctionsInstance[];
  // ...
  storage?:
    | {
        postdeploy?: string[] | string;
        predeploy?: string[] | string;
        rules: string;
        target?: string;
      }
    | {
        bucket: string;
        postdeploy?: string[] | string;
        predeploy?: string[] | string;
        rules: string;
        target?: string;
      }[];
}

export interface ExtensionsConfig {}
export interface FrameworksBackendOptions {
  /**
   * Number of requests a function can serve at once.
   */
  concurrency?: number;
  /**
   * If true, allows CORS on requests to this function.
   * If this is a `string` or `RegExp`, allows requests from domains that match the provided value.
   * If this is an `Array`, allows requests from domains matching at least one entry of the array.
   * Defaults to true for {@link https.CallableFunction} and false otherwise.
   */
  cors?: string | boolean;
  /**
   * Fractional number of CPUs to allocate to a function.
   */
  cpu?: 'gcf_gen1' | number;
  /**
   * Determines whether Firebase AppCheck is enforced. Defaults to false.
   */
  enforceAppCheck?: boolean;
  /**
   * Ingress settings which control where this function can be called from.
   */
  ingressSettings?:
    | 'ALLOW_ALL'
    | 'ALLOW_INTERNAL_AND_GCLB'
    | 'ALLOW_INTERNAL_ONLY';
  /**
   * Invoker to set access control on https functions.
   */
  invoker?: 'public';
  /**
   * User labels to set on the function.
   */
  labels?: Record<string, string>;
  /**
   * Max number of instances to be running in parallel.
   */
  maxInstances?: number;
  /**
   * Amount of memory to allocate to a function.
   */
  memory?:
    | '128MiB'
    | '16GiB'
    | '1GiB'
    | '256MiB'
    | '2GiB'
    | '32GiB'
    | '4GiB'
    | '512MiB'
    | '8GiB';
  /**
   * Min number of actual instances to be running at a given time.
   */
  minInstances?: number;
  /**
   * If true, do not deploy or emulate this function.
   */
  omit?: boolean;
  /**
   * Controls whether function configuration modified outside of function source is preserved. Defaults to false.
   */
  preserveExternalChanges?: boolean;
  /**
   * HTTP functions can override global options and can specify multiple regions to deploy to.
   */
  region?: string;
  secrets?: string[];
  /**
   * Specific service account for the function to run as.
   */
  serviceAccount?: string;
  /**
   * Timeout for the function in seconds, possible values are 0 to 540.
   * HTTPS functions can specify a higher timeout.
   */
  timeoutSeconds?: number;
  /**
   * Connect cloud function to specified VPC connector.
   */
  vpcConnector?: string;
  /**
   * Egress settings for VPC connector.
   */
  vpcConnectorEgressSettings?: 'ALL_TRAFFIC' | 'PRIVATE_RANGES_ONLY';
}
