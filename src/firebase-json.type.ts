export interface FirebaseJson {
  $schema?: string;
  database?:
    | {
        postdeploy?: string[] | string;
        predeploy?: string[] | string;
        rules: string;
      }
    | (
        | {
            instance: string;
            postdeploy?: string[] | string;
            predeploy?: string[] | string;
            rules: string;
            target?: string;
          }
        | {
            instance?: string;
            postdeploy?: string[] | string;
            predeploy?: string[] | string;
            rules: string;
            target: string;
          }
      )[];
  emulators?: {
    auth?: {
      host?: string;
      port?: number;
    };
    database?: {
      host?: string;
      port?: number;
    };
    eventarc?: {
      host?: string;
      port?: number;
    };
    extensions?: {
      [k: string]: unknown;
    };
    firestore?: {
      host?: string;
      port?: number;
      websocketPort?: number;
    };
    functions?: {
      host?: string;
      port?: number;
    };
    hosting?: {
      host?: string;
      port?: number;
    };
    hub?: {
      host?: string;
      port?: number;
    };
    logging?: {
      host?: string;
      port?: number;
    };
    pubsub?: {
      host?: string;
      port?: number;
    };
    singleProjectMode?: boolean;
    storage?: {
      host?: string;
      port?: number;
    };
    ui?: {
      enabled?: boolean;
      host?: string;
      port?: string | number;
    };
  };
  extensions?: ExtensionsConfig;
  firestore?:
    | {
        database?: string;
        indexes?: string;
        postdeploy?: string[] | string;
        predeploy?: string[] | string;
        rules?: string;
      }
    | (
        | {
            database?: string;
            indexes?: string;
            postdeploy?: string[] | string;
            predeploy?: string[] | string;
            rules?: string;
            target: string;
          }
        | {
            database: string;
            indexes?: string;
            postdeploy?: string[] | string;
            predeploy?: string[] | string;
            rules?: string;
            target?: string;
          }
      )[];
  functions?:
    | {
        codebase?: string;
        ignore?: string[];
        postdeploy?: string[] | string;
        predeploy?: string[] | string;
        runtime?:
          | 'nodejs10'
          | 'nodejs12'
          | 'nodejs14'
          | 'nodejs16'
          | 'nodejs18'
          | 'nodejs20';
        source?: string;
      }
    | {
        codebase?: string;
        ignore?: string[];
        postdeploy?: string[] | string;
        predeploy?: string[] | string;
        runtime?:
          | 'nodejs10'
          | 'nodejs12'
          | 'nodejs14'
          | 'nodejs16'
          | 'nodejs18'
          | 'nodejs20';
        source?: string;
      }[];
  hosting?:
    | {
        appAssociation?: 'AUTO' | 'NONE';
        cleanUrls?: boolean;
        frameworksBackend?: FrameworksBackendOptions;
        headers?: (
          | {
              glob: string;
              headers: {
                key: string;
                value: string;
              }[];
            }
          | {
              headers: {
                key: string;
                value: string;
              }[];
              source: string;
            }
          | {
              headers: {
                key: string;
                value: string;
              }[];
              regex: string;
            }
        )[];
        i18n?: {
          root: string;
        };
        ignore?: string[];
        postdeploy?: string[] | string;
        predeploy?: string[] | string;
        public?: string;
        redirects?: (
          | {
              destination: string;
              glob: string;
              type?: number;
            }
          | {
              destination: string;
              source: string;
              type?: number;
            }
          | {
              destination: string;
              regex: string;
              type?: number;
            }
        )[];
        rewrites?: (
          | {
              destination: string;
              glob: string;
            }
          | {
              function: string;
              glob: string;
              region?: string;
            }
          | {
              function: {
                functionId: string;
                pinTag?: boolean;
                region?: string;
              };
              glob: string;
            }
          | {
              glob: string;
              run: {
                pinTag?: boolean;
                region?: string;
                serviceId: string;
              };
            }
          | {
              dynamicLinks: boolean;
              glob: string;
            }
          | {
              destination: string;
              source: string;
            }
          | {
              function: string;
              region?: string;
              source: string;
            }
          | {
              function: {
                functionId: string;
                pinTag?: boolean;
                region?: string;
              };
              source: string;
            }
          | {
              run: {
                pinTag?: boolean;
                region?: string;
                serviceId: string;
              };
              source: string;
            }
          | {
              dynamicLinks: boolean;
              source: string;
            }
          | {
              destination: string;
              regex: string;
            }
          | {
              function: string;
              regex: string;
              region?: string;
            }
          | {
              function: {
                functionId: string;
                pinTag?: boolean;
                region?: string;
              };
              regex: string;
            }
          | {
              regex: string;
              run: {
                pinTag?: boolean;
                region?: string;
                serviceId: string;
              };
            }
          | {
              dynamicLinks: boolean;
              regex: string;
            }
        )[];
        site?: string;
        source?: string;
        target?: string;
        trailingSlash?: boolean;
      }
    | (
        | {
            appAssociation?: 'AUTO' | 'NONE';
            cleanUrls?: boolean;
            frameworksBackend?: FrameworksBackendOptions;
            headers?: (
              | {
                  glob: string;
                  headers: {
                    key: string;
                    value: string;
                  }[];
                }
              | {
                  headers: {
                    key: string;
                    value: string;
                  }[];
                  source: string;
                }
              | {
                  headers: {
                    key: string;
                    value: string;
                  }[];
                  regex: string;
                }
            )[];
            i18n?: {
              root: string;
            };
            ignore?: string[];
            postdeploy?: string[] | string;
            predeploy?: string[] | string;
            public?: string;
            redirects?: (
              | {
                  destination: string;
                  glob: string;
                  type?: number;
                }
              | {
                  destination: string;
                  source: string;
                  type?: number;
                }
              | {
                  destination: string;
                  regex: string;
                  type?: number;
                }
            )[];
            rewrites?: (
              | {
                  destination: string;
                  glob: string;
                }
              | {
                  function: string;
                  glob: string;
                  region?: string;
                }
              | {
                  function: {
                    functionId: string;
                    pinTag?: boolean;
                    region?: string;
                  };
                  glob: string;
                }
              | {
                  glob: string;
                  run: {
                    pinTag?: boolean;
                    region?: string;
                    serviceId: string;
                  };
                }
              | {
                  dynamicLinks: boolean;
                  glob: string;
                }
              | {
                  destination: string;
                  source: string;
                }
              | {
                  function: string;
                  region?: string;
                  source: string;
                }
              | {
                  function: {
                    functionId: string;
                    pinTag?: boolean;
                    region?: string;
                  };
                  source: string;
                }
              | {
                  run: {
                    pinTag?: boolean;
                    region?: string;
                    serviceId: string;
                  };
                  source: string;
                }
              | {
                  dynamicLinks: boolean;
                  source: string;
                }
              | {
                  destination: string;
                  regex: string;
                }
              | {
                  function: string;
                  regex: string;
                  region?: string;
                }
              | {
                  function: {
                    functionId: string;
                    pinTag?: boolean;
                    region?: string;
                  };
                  regex: string;
                }
              | {
                  regex: string;
                  run: {
                    pinTag?: boolean;
                    region?: string;
                    serviceId: string;
                  };
                }
              | {
                  dynamicLinks: boolean;
                  regex: string;
                }
            )[];
            site?: string;
            source?: string;
            target: string;
            trailingSlash?: boolean;
          }
        | {
            appAssociation?: 'AUTO' | 'NONE';
            cleanUrls?: boolean;
            frameworksBackend?: FrameworksBackendOptions;
            headers?: (
              | {
                  glob: string;
                  headers: {
                    key: string;
                    value: string;
                  }[];
                }
              | {
                  headers: {
                    key: string;
                    value: string;
                  }[];
                  source: string;
                }
              | {
                  headers: {
                    key: string;
                    value: string;
                  }[];
                  regex: string;
                }
            )[];
            i18n?: {
              root: string;
            };
            ignore?: string[];
            postdeploy?: string[] | string;
            predeploy?: string[] | string;
            public?: string;
            redirects?: (
              | {
                  destination: string;
                  glob: string;
                  type?: number;
                }
              | {
                  destination: string;
                  source: string;
                  type?: number;
                }
              | {
                  destination: string;
                  regex: string;
                  type?: number;
                }
            )[];
            rewrites?: (
              | {
                  destination: string;
                  glob: string;
                }
              | {
                  function: string;
                  glob: string;
                  region?: string;
                }
              | {
                  function: {
                    functionId: string;
                    pinTag?: boolean;
                    region?: string;
                  };
                  glob: string;
                }
              | {
                  glob: string;
                  run: {
                    pinTag?: boolean;
                    region?: string;
                    serviceId: string;
                  };
                }
              | {
                  dynamicLinks: boolean;
                  glob: string;
                }
              | {
                  destination: string;
                  source: string;
                }
              | {
                  function: string;
                  region?: string;
                  source: string;
                }
              | {
                  function: {
                    functionId: string;
                    pinTag?: boolean;
                    region?: string;
                  };
                  source: string;
                }
              | {
                  run: {
                    pinTag?: boolean;
                    region?: string;
                    serviceId: string;
                  };
                  source: string;
                }
              | {
                  dynamicLinks: boolean;
                  source: string;
                }
              | {
                  destination: string;
                  regex: string;
                }
              | {
                  function: string;
                  regex: string;
                  region?: string;
                }
              | {
                  function: {
                    functionId: string;
                    pinTag?: boolean;
                    region?: string;
                  };
                  regex: string;
                }
              | {
                  regex: string;
                  run: {
                    pinTag?: boolean;
                    region?: string;
                    serviceId: string;
                  };
                }
              | {
                  dynamicLinks: boolean;
                  regex: string;
                }
            )[];
            site: string;
            source?: string;
            target?: string;
            trailingSlash?: boolean;
          }
      )[];
  remoteconfig?: {
    postdeploy?: string[] | string;
    predeploy?: string[] | string;
    template: string;
  };
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
