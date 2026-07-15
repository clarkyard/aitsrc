
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Voter
 * 
 */
export type Voter = $Result.DefaultSelection<Prisma.$VoterPayload>
/**
 * Model Ballot
 * 
 */
export type Ballot = $Result.DefaultSelection<Prisma.$BallotPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model ElectionState
 * 
 */
export type ElectionState = $Result.DefaultSelection<Prisma.$ElectionStatePayload>
/**
 * Model DecryptionShare
 * 
 */
export type DecryptionShare = $Result.DefaultSelection<Prisma.$DecryptionSharePayload>
/**
 * Model ReceiptLookup
 * 
 */
export type ReceiptLookup = $Result.DefaultSelection<Prisma.$ReceiptLookupPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Voters
 * const voters = await prisma.voter.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Voters
   * const voters = await prisma.voter.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.voter`: Exposes CRUD operations for the **Voter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Voters
    * const voters = await prisma.voter.findMany()
    * ```
    */
  get voter(): Prisma.VoterDelegate<ExtArgs>;

  /**
   * `prisma.ballot`: Exposes CRUD operations for the **Ballot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ballots
    * const ballots = await prisma.ballot.findMany()
    * ```
    */
  get ballot(): Prisma.BallotDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.electionState`: Exposes CRUD operations for the **ElectionState** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ElectionStates
    * const electionStates = await prisma.electionState.findMany()
    * ```
    */
  get electionState(): Prisma.ElectionStateDelegate<ExtArgs>;

  /**
   * `prisma.decryptionShare`: Exposes CRUD operations for the **DecryptionShare** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DecryptionShares
    * const decryptionShares = await prisma.decryptionShare.findMany()
    * ```
    */
  get decryptionShare(): Prisma.DecryptionShareDelegate<ExtArgs>;

  /**
   * `prisma.receiptLookup`: Exposes CRUD operations for the **ReceiptLookup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReceiptLookups
    * const receiptLookups = await prisma.receiptLookup.findMany()
    * ```
    */
  get receiptLookup(): Prisma.ReceiptLookupDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Voter: 'Voter',
    Ballot: 'Ballot',
    AuditLog: 'AuditLog',
    ElectionState: 'ElectionState',
    DecryptionShare: 'DecryptionShare',
    ReceiptLookup: 'ReceiptLookup'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "voter" | "ballot" | "auditLog" | "electionState" | "decryptionShare" | "receiptLookup"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Voter: {
        payload: Prisma.$VoterPayload<ExtArgs>
        fields: Prisma.VoterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoterPayload>
          }
          findFirst: {
            args: Prisma.VoterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoterPayload>
          }
          findMany: {
            args: Prisma.VoterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoterPayload>[]
          }
          create: {
            args: Prisma.VoterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoterPayload>
          }
          createMany: {
            args: Prisma.VoterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoterPayload>[]
          }
          delete: {
            args: Prisma.VoterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoterPayload>
          }
          update: {
            args: Prisma.VoterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoterPayload>
          }
          deleteMany: {
            args: Prisma.VoterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VoterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoterPayload>
          }
          aggregate: {
            args: Prisma.VoterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoter>
          }
          groupBy: {
            args: Prisma.VoterGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoterGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoterCountArgs<ExtArgs>
            result: $Utils.Optional<VoterCountAggregateOutputType> | number
          }
        }
      }
      Ballot: {
        payload: Prisma.$BallotPayload<ExtArgs>
        fields: Prisma.BallotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BallotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BallotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          findFirst: {
            args: Prisma.BallotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BallotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          findMany: {
            args: Prisma.BallotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>[]
          }
          create: {
            args: Prisma.BallotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          createMany: {
            args: Prisma.BallotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BallotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>[]
          }
          delete: {
            args: Prisma.BallotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          update: {
            args: Prisma.BallotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          deleteMany: {
            args: Prisma.BallotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BallotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BallotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          aggregate: {
            args: Prisma.BallotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBallot>
          }
          groupBy: {
            args: Prisma.BallotGroupByArgs<ExtArgs>
            result: $Utils.Optional<BallotGroupByOutputType>[]
          }
          count: {
            args: Prisma.BallotCountArgs<ExtArgs>
            result: $Utils.Optional<BallotCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      ElectionState: {
        payload: Prisma.$ElectionStatePayload<ExtArgs>
        fields: Prisma.ElectionStateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElectionStateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElectionStateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatePayload>
          }
          findFirst: {
            args: Prisma.ElectionStateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElectionStateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatePayload>
          }
          findMany: {
            args: Prisma.ElectionStateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatePayload>[]
          }
          create: {
            args: Prisma.ElectionStateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatePayload>
          }
          createMany: {
            args: Prisma.ElectionStateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ElectionStateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatePayload>[]
          }
          delete: {
            args: Prisma.ElectionStateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatePayload>
          }
          update: {
            args: Prisma.ElectionStateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatePayload>
          }
          deleteMany: {
            args: Prisma.ElectionStateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElectionStateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ElectionStateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatePayload>
          }
          aggregate: {
            args: Prisma.ElectionStateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElectionState>
          }
          groupBy: {
            args: Prisma.ElectionStateGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElectionStateGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElectionStateCountArgs<ExtArgs>
            result: $Utils.Optional<ElectionStateCountAggregateOutputType> | number
          }
        }
      }
      DecryptionShare: {
        payload: Prisma.$DecryptionSharePayload<ExtArgs>
        fields: Prisma.DecryptionShareFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DecryptionShareFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DecryptionSharePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DecryptionShareFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DecryptionSharePayload>
          }
          findFirst: {
            args: Prisma.DecryptionShareFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DecryptionSharePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DecryptionShareFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DecryptionSharePayload>
          }
          findMany: {
            args: Prisma.DecryptionShareFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DecryptionSharePayload>[]
          }
          create: {
            args: Prisma.DecryptionShareCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DecryptionSharePayload>
          }
          createMany: {
            args: Prisma.DecryptionShareCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DecryptionShareCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DecryptionSharePayload>[]
          }
          delete: {
            args: Prisma.DecryptionShareDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DecryptionSharePayload>
          }
          update: {
            args: Prisma.DecryptionShareUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DecryptionSharePayload>
          }
          deleteMany: {
            args: Prisma.DecryptionShareDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DecryptionShareUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DecryptionShareUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DecryptionSharePayload>
          }
          aggregate: {
            args: Prisma.DecryptionShareAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDecryptionShare>
          }
          groupBy: {
            args: Prisma.DecryptionShareGroupByArgs<ExtArgs>
            result: $Utils.Optional<DecryptionShareGroupByOutputType>[]
          }
          count: {
            args: Prisma.DecryptionShareCountArgs<ExtArgs>
            result: $Utils.Optional<DecryptionShareCountAggregateOutputType> | number
          }
        }
      }
      ReceiptLookup: {
        payload: Prisma.$ReceiptLookupPayload<ExtArgs>
        fields: Prisma.ReceiptLookupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReceiptLookupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptLookupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReceiptLookupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptLookupPayload>
          }
          findFirst: {
            args: Prisma.ReceiptLookupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptLookupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReceiptLookupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptLookupPayload>
          }
          findMany: {
            args: Prisma.ReceiptLookupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptLookupPayload>[]
          }
          create: {
            args: Prisma.ReceiptLookupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptLookupPayload>
          }
          createMany: {
            args: Prisma.ReceiptLookupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReceiptLookupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptLookupPayload>[]
          }
          delete: {
            args: Prisma.ReceiptLookupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptLookupPayload>
          }
          update: {
            args: Prisma.ReceiptLookupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptLookupPayload>
          }
          deleteMany: {
            args: Prisma.ReceiptLookupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReceiptLookupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReceiptLookupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptLookupPayload>
          }
          aggregate: {
            args: Prisma.ReceiptLookupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReceiptLookup>
          }
          groupBy: {
            args: Prisma.ReceiptLookupGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReceiptLookupGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReceiptLookupCountArgs<ExtArgs>
            result: $Utils.Optional<ReceiptLookupCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Voter
   */

  export type AggregateVoter = {
    _count: VoterCountAggregateOutputType | null
    _min: VoterMinAggregateOutputType | null
    _max: VoterMaxAggregateOutputType | null
  }

  export type VoterMinAggregateOutputType = {
    studentId: string | null
    hasVoted: boolean | null
    votedAt: Date | null
    department: string | null
    email: string | null
  }

  export type VoterMaxAggregateOutputType = {
    studentId: string | null
    hasVoted: boolean | null
    votedAt: Date | null
    department: string | null
    email: string | null
  }

  export type VoterCountAggregateOutputType = {
    studentId: number
    hasVoted: number
    votedAt: number
    department: number
    email: number
    _all: number
  }


  export type VoterMinAggregateInputType = {
    studentId?: true
    hasVoted?: true
    votedAt?: true
    department?: true
    email?: true
  }

  export type VoterMaxAggregateInputType = {
    studentId?: true
    hasVoted?: true
    votedAt?: true
    department?: true
    email?: true
  }

  export type VoterCountAggregateInputType = {
    studentId?: true
    hasVoted?: true
    votedAt?: true
    department?: true
    email?: true
    _all?: true
  }

  export type VoterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Voter to aggregate.
     */
    where?: VoterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Voters to fetch.
     */
    orderBy?: VoterOrderByWithRelationInput | VoterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Voters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Voters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Voters
    **/
    _count?: true | VoterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoterMaxAggregateInputType
  }

  export type GetVoterAggregateType<T extends VoterAggregateArgs> = {
        [P in keyof T & keyof AggregateVoter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoter[P]>
      : GetScalarType<T[P], AggregateVoter[P]>
  }




  export type VoterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoterWhereInput
    orderBy?: VoterOrderByWithAggregationInput | VoterOrderByWithAggregationInput[]
    by: VoterScalarFieldEnum[] | VoterScalarFieldEnum
    having?: VoterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoterCountAggregateInputType | true
    _min?: VoterMinAggregateInputType
    _max?: VoterMaxAggregateInputType
  }

  export type VoterGroupByOutputType = {
    studentId: string
    hasVoted: boolean
    votedAt: Date | null
    department: string
    email: string
    _count: VoterCountAggregateOutputType | null
    _min: VoterMinAggregateOutputType | null
    _max: VoterMaxAggregateOutputType | null
  }

  type GetVoterGroupByPayload<T extends VoterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoterGroupByOutputType[P]>
            : GetScalarType<T[P], VoterGroupByOutputType[P]>
        }
      >
    >


  export type VoterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    hasVoted?: boolean
    votedAt?: boolean
    department?: boolean
    email?: boolean
  }, ExtArgs["result"]["voter"]>

  export type VoterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentId?: boolean
    hasVoted?: boolean
    votedAt?: boolean
    department?: boolean
    email?: boolean
  }, ExtArgs["result"]["voter"]>

  export type VoterSelectScalar = {
    studentId?: boolean
    hasVoted?: boolean
    votedAt?: boolean
    department?: boolean
    email?: boolean
  }


  export type $VoterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Voter"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      studentId: string
      hasVoted: boolean
      votedAt: Date | null
      department: string
      email: string
    }, ExtArgs["result"]["voter"]>
    composites: {}
  }

  type VoterGetPayload<S extends boolean | null | undefined | VoterDefaultArgs> = $Result.GetResult<Prisma.$VoterPayload, S>

  type VoterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VoterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VoterCountAggregateInputType | true
    }

  export interface VoterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Voter'], meta: { name: 'Voter' } }
    /**
     * Find zero or one Voter that matches the filter.
     * @param {VoterFindUniqueArgs} args - Arguments to find a Voter
     * @example
     * // Get one Voter
     * const voter = await prisma.voter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoterFindUniqueArgs>(args: SelectSubset<T, VoterFindUniqueArgs<ExtArgs>>): Prisma__VoterClient<$Result.GetResult<Prisma.$VoterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Voter that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VoterFindUniqueOrThrowArgs} args - Arguments to find a Voter
     * @example
     * // Get one Voter
     * const voter = await prisma.voter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoterFindUniqueOrThrowArgs>(args: SelectSubset<T, VoterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoterClient<$Result.GetResult<Prisma.$VoterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Voter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoterFindFirstArgs} args - Arguments to find a Voter
     * @example
     * // Get one Voter
     * const voter = await prisma.voter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoterFindFirstArgs>(args?: SelectSubset<T, VoterFindFirstArgs<ExtArgs>>): Prisma__VoterClient<$Result.GetResult<Prisma.$VoterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Voter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoterFindFirstOrThrowArgs} args - Arguments to find a Voter
     * @example
     * // Get one Voter
     * const voter = await prisma.voter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoterFindFirstOrThrowArgs>(args?: SelectSubset<T, VoterFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoterClient<$Result.GetResult<Prisma.$VoterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Voters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Voters
     * const voters = await prisma.voter.findMany()
     * 
     * // Get first 10 Voters
     * const voters = await prisma.voter.findMany({ take: 10 })
     * 
     * // Only select the `studentId`
     * const voterWithStudentIdOnly = await prisma.voter.findMany({ select: { studentId: true } })
     * 
     */
    findMany<T extends VoterFindManyArgs>(args?: SelectSubset<T, VoterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Voter.
     * @param {VoterCreateArgs} args - Arguments to create a Voter.
     * @example
     * // Create one Voter
     * const Voter = await prisma.voter.create({
     *   data: {
     *     // ... data to create a Voter
     *   }
     * })
     * 
     */
    create<T extends VoterCreateArgs>(args: SelectSubset<T, VoterCreateArgs<ExtArgs>>): Prisma__VoterClient<$Result.GetResult<Prisma.$VoterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Voters.
     * @param {VoterCreateManyArgs} args - Arguments to create many Voters.
     * @example
     * // Create many Voters
     * const voter = await prisma.voter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoterCreateManyArgs>(args?: SelectSubset<T, VoterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Voters and returns the data saved in the database.
     * @param {VoterCreateManyAndReturnArgs} args - Arguments to create many Voters.
     * @example
     * // Create many Voters
     * const voter = await prisma.voter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Voters and only return the `studentId`
     * const voterWithStudentIdOnly = await prisma.voter.createManyAndReturn({ 
     *   select: { studentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoterCreateManyAndReturnArgs>(args?: SelectSubset<T, VoterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoterPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Voter.
     * @param {VoterDeleteArgs} args - Arguments to delete one Voter.
     * @example
     * // Delete one Voter
     * const Voter = await prisma.voter.delete({
     *   where: {
     *     // ... filter to delete one Voter
     *   }
     * })
     * 
     */
    delete<T extends VoterDeleteArgs>(args: SelectSubset<T, VoterDeleteArgs<ExtArgs>>): Prisma__VoterClient<$Result.GetResult<Prisma.$VoterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Voter.
     * @param {VoterUpdateArgs} args - Arguments to update one Voter.
     * @example
     * // Update one Voter
     * const voter = await prisma.voter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoterUpdateArgs>(args: SelectSubset<T, VoterUpdateArgs<ExtArgs>>): Prisma__VoterClient<$Result.GetResult<Prisma.$VoterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Voters.
     * @param {VoterDeleteManyArgs} args - Arguments to filter Voters to delete.
     * @example
     * // Delete a few Voters
     * const { count } = await prisma.voter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoterDeleteManyArgs>(args?: SelectSubset<T, VoterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Voters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Voters
     * const voter = await prisma.voter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoterUpdateManyArgs>(args: SelectSubset<T, VoterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Voter.
     * @param {VoterUpsertArgs} args - Arguments to update or create a Voter.
     * @example
     * // Update or create a Voter
     * const voter = await prisma.voter.upsert({
     *   create: {
     *     // ... data to create a Voter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Voter we want to update
     *   }
     * })
     */
    upsert<T extends VoterUpsertArgs>(args: SelectSubset<T, VoterUpsertArgs<ExtArgs>>): Prisma__VoterClient<$Result.GetResult<Prisma.$VoterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Voters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoterCountArgs} args - Arguments to filter Voters to count.
     * @example
     * // Count the number of Voters
     * const count = await prisma.voter.count({
     *   where: {
     *     // ... the filter for the Voters we want to count
     *   }
     * })
    **/
    count<T extends VoterCountArgs>(
      args?: Subset<T, VoterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Voter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoterAggregateArgs>(args: Subset<T, VoterAggregateArgs>): Prisma.PrismaPromise<GetVoterAggregateType<T>>

    /**
     * Group by Voter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoterGroupByArgs['orderBy'] }
        : { orderBy?: VoterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Voter model
   */
  readonly fields: VoterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Voter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Voter model
   */ 
  interface VoterFieldRefs {
    readonly studentId: FieldRef<"Voter", 'String'>
    readonly hasVoted: FieldRef<"Voter", 'Boolean'>
    readonly votedAt: FieldRef<"Voter", 'DateTime'>
    readonly department: FieldRef<"Voter", 'String'>
    readonly email: FieldRef<"Voter", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Voter findUnique
   */
  export type VoterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voter
     */
    select?: VoterSelect<ExtArgs> | null
    /**
     * Filter, which Voter to fetch.
     */
    where: VoterWhereUniqueInput
  }

  /**
   * Voter findUniqueOrThrow
   */
  export type VoterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voter
     */
    select?: VoterSelect<ExtArgs> | null
    /**
     * Filter, which Voter to fetch.
     */
    where: VoterWhereUniqueInput
  }

  /**
   * Voter findFirst
   */
  export type VoterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voter
     */
    select?: VoterSelect<ExtArgs> | null
    /**
     * Filter, which Voter to fetch.
     */
    where?: VoterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Voters to fetch.
     */
    orderBy?: VoterOrderByWithRelationInput | VoterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Voters.
     */
    cursor?: VoterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Voters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Voters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Voters.
     */
    distinct?: VoterScalarFieldEnum | VoterScalarFieldEnum[]
  }

  /**
   * Voter findFirstOrThrow
   */
  export type VoterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voter
     */
    select?: VoterSelect<ExtArgs> | null
    /**
     * Filter, which Voter to fetch.
     */
    where?: VoterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Voters to fetch.
     */
    orderBy?: VoterOrderByWithRelationInput | VoterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Voters.
     */
    cursor?: VoterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Voters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Voters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Voters.
     */
    distinct?: VoterScalarFieldEnum | VoterScalarFieldEnum[]
  }

  /**
   * Voter findMany
   */
  export type VoterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voter
     */
    select?: VoterSelect<ExtArgs> | null
    /**
     * Filter, which Voters to fetch.
     */
    where?: VoterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Voters to fetch.
     */
    orderBy?: VoterOrderByWithRelationInput | VoterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Voters.
     */
    cursor?: VoterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Voters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Voters.
     */
    skip?: number
    distinct?: VoterScalarFieldEnum | VoterScalarFieldEnum[]
  }

  /**
   * Voter create
   */
  export type VoterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voter
     */
    select?: VoterSelect<ExtArgs> | null
    /**
     * The data needed to create a Voter.
     */
    data: XOR<VoterCreateInput, VoterUncheckedCreateInput>
  }

  /**
   * Voter createMany
   */
  export type VoterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Voters.
     */
    data: VoterCreateManyInput | VoterCreateManyInput[]
  }

  /**
   * Voter createManyAndReturn
   */
  export type VoterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voter
     */
    select?: VoterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Voters.
     */
    data: VoterCreateManyInput | VoterCreateManyInput[]
  }

  /**
   * Voter update
   */
  export type VoterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voter
     */
    select?: VoterSelect<ExtArgs> | null
    /**
     * The data needed to update a Voter.
     */
    data: XOR<VoterUpdateInput, VoterUncheckedUpdateInput>
    /**
     * Choose, which Voter to update.
     */
    where: VoterWhereUniqueInput
  }

  /**
   * Voter updateMany
   */
  export type VoterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Voters.
     */
    data: XOR<VoterUpdateManyMutationInput, VoterUncheckedUpdateManyInput>
    /**
     * Filter which Voters to update
     */
    where?: VoterWhereInput
  }

  /**
   * Voter upsert
   */
  export type VoterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voter
     */
    select?: VoterSelect<ExtArgs> | null
    /**
     * The filter to search for the Voter to update in case it exists.
     */
    where: VoterWhereUniqueInput
    /**
     * In case the Voter found by the `where` argument doesn't exist, create a new Voter with this data.
     */
    create: XOR<VoterCreateInput, VoterUncheckedCreateInput>
    /**
     * In case the Voter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoterUpdateInput, VoterUncheckedUpdateInput>
  }

  /**
   * Voter delete
   */
  export type VoterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voter
     */
    select?: VoterSelect<ExtArgs> | null
    /**
     * Filter which Voter to delete.
     */
    where: VoterWhereUniqueInput
  }

  /**
   * Voter deleteMany
   */
  export type VoterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Voters to delete
     */
    where?: VoterWhereInput
  }

  /**
   * Voter without action
   */
  export type VoterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voter
     */
    select?: VoterSelect<ExtArgs> | null
  }


  /**
   * Model Ballot
   */

  export type AggregateBallot = {
    _count: BallotCountAggregateOutputType | null
    _avg: BallotAvgAggregateOutputType | null
    _sum: BallotSumAggregateOutputType | null
    _min: BallotMinAggregateOutputType | null
    _max: BallotMaxAggregateOutputType | null
  }

  export type BallotAvgAggregateOutputType = {
    id: number | null
  }

  export type BallotSumAggregateOutputType = {
    id: number | null
  }

  export type BallotMinAggregateOutputType = {
    id: number | null
    anonymousToken: string | null
    choices: string | null
    castAt: Date | null
    hash: string | null
    prevHash: string | null
  }

  export type BallotMaxAggregateOutputType = {
    id: number | null
    anonymousToken: string | null
    choices: string | null
    castAt: Date | null
    hash: string | null
    prevHash: string | null
  }

  export type BallotCountAggregateOutputType = {
    id: number
    anonymousToken: number
    choices: number
    castAt: number
    hash: number
    prevHash: number
    _all: number
  }


  export type BallotAvgAggregateInputType = {
    id?: true
  }

  export type BallotSumAggregateInputType = {
    id?: true
  }

  export type BallotMinAggregateInputType = {
    id?: true
    anonymousToken?: true
    choices?: true
    castAt?: true
    hash?: true
    prevHash?: true
  }

  export type BallotMaxAggregateInputType = {
    id?: true
    anonymousToken?: true
    choices?: true
    castAt?: true
    hash?: true
    prevHash?: true
  }

  export type BallotCountAggregateInputType = {
    id?: true
    anonymousToken?: true
    choices?: true
    castAt?: true
    hash?: true
    prevHash?: true
    _all?: true
  }

  export type BallotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ballot to aggregate.
     */
    where?: BallotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ballots to fetch.
     */
    orderBy?: BallotOrderByWithRelationInput | BallotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BallotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ballots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ballots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ballots
    **/
    _count?: true | BallotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BallotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BallotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BallotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BallotMaxAggregateInputType
  }

  export type GetBallotAggregateType<T extends BallotAggregateArgs> = {
        [P in keyof T & keyof AggregateBallot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBallot[P]>
      : GetScalarType<T[P], AggregateBallot[P]>
  }




  export type BallotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BallotWhereInput
    orderBy?: BallotOrderByWithAggregationInput | BallotOrderByWithAggregationInput[]
    by: BallotScalarFieldEnum[] | BallotScalarFieldEnum
    having?: BallotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BallotCountAggregateInputType | true
    _avg?: BallotAvgAggregateInputType
    _sum?: BallotSumAggregateInputType
    _min?: BallotMinAggregateInputType
    _max?: BallotMaxAggregateInputType
  }

  export type BallotGroupByOutputType = {
    id: number
    anonymousToken: string
    choices: string
    castAt: Date
    hash: string
    prevHash: string
    _count: BallotCountAggregateOutputType | null
    _avg: BallotAvgAggregateOutputType | null
    _sum: BallotSumAggregateOutputType | null
    _min: BallotMinAggregateOutputType | null
    _max: BallotMaxAggregateOutputType | null
  }

  type GetBallotGroupByPayload<T extends BallotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BallotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BallotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BallotGroupByOutputType[P]>
            : GetScalarType<T[P], BallotGroupByOutputType[P]>
        }
      >
    >


  export type BallotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonymousToken?: boolean
    choices?: boolean
    castAt?: boolean
    hash?: boolean
    prevHash?: boolean
  }, ExtArgs["result"]["ballot"]>

  export type BallotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    anonymousToken?: boolean
    choices?: boolean
    castAt?: boolean
    hash?: boolean
    prevHash?: boolean
  }, ExtArgs["result"]["ballot"]>

  export type BallotSelectScalar = {
    id?: boolean
    anonymousToken?: boolean
    choices?: boolean
    castAt?: boolean
    hash?: boolean
    prevHash?: boolean
  }


  export type $BallotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ballot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      anonymousToken: string
      choices: string
      castAt: Date
      hash: string
      prevHash: string
    }, ExtArgs["result"]["ballot"]>
    composites: {}
  }

  type BallotGetPayload<S extends boolean | null | undefined | BallotDefaultArgs> = $Result.GetResult<Prisma.$BallotPayload, S>

  type BallotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BallotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BallotCountAggregateInputType | true
    }

  export interface BallotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ballot'], meta: { name: 'Ballot' } }
    /**
     * Find zero or one Ballot that matches the filter.
     * @param {BallotFindUniqueArgs} args - Arguments to find a Ballot
     * @example
     * // Get one Ballot
     * const ballot = await prisma.ballot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BallotFindUniqueArgs>(args: SelectSubset<T, BallotFindUniqueArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Ballot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BallotFindUniqueOrThrowArgs} args - Arguments to find a Ballot
     * @example
     * // Get one Ballot
     * const ballot = await prisma.ballot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BallotFindUniqueOrThrowArgs>(args: SelectSubset<T, BallotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Ballot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotFindFirstArgs} args - Arguments to find a Ballot
     * @example
     * // Get one Ballot
     * const ballot = await prisma.ballot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BallotFindFirstArgs>(args?: SelectSubset<T, BallotFindFirstArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Ballot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotFindFirstOrThrowArgs} args - Arguments to find a Ballot
     * @example
     * // Get one Ballot
     * const ballot = await prisma.ballot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BallotFindFirstOrThrowArgs>(args?: SelectSubset<T, BallotFindFirstOrThrowArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Ballots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ballots
     * const ballots = await prisma.ballot.findMany()
     * 
     * // Get first 10 Ballots
     * const ballots = await prisma.ballot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ballotWithIdOnly = await prisma.ballot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BallotFindManyArgs>(args?: SelectSubset<T, BallotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Ballot.
     * @param {BallotCreateArgs} args - Arguments to create a Ballot.
     * @example
     * // Create one Ballot
     * const Ballot = await prisma.ballot.create({
     *   data: {
     *     // ... data to create a Ballot
     *   }
     * })
     * 
     */
    create<T extends BallotCreateArgs>(args: SelectSubset<T, BallotCreateArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Ballots.
     * @param {BallotCreateManyArgs} args - Arguments to create many Ballots.
     * @example
     * // Create many Ballots
     * const ballot = await prisma.ballot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BallotCreateManyArgs>(args?: SelectSubset<T, BallotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ballots and returns the data saved in the database.
     * @param {BallotCreateManyAndReturnArgs} args - Arguments to create many Ballots.
     * @example
     * // Create many Ballots
     * const ballot = await prisma.ballot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ballots and only return the `id`
     * const ballotWithIdOnly = await prisma.ballot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BallotCreateManyAndReturnArgs>(args?: SelectSubset<T, BallotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Ballot.
     * @param {BallotDeleteArgs} args - Arguments to delete one Ballot.
     * @example
     * // Delete one Ballot
     * const Ballot = await prisma.ballot.delete({
     *   where: {
     *     // ... filter to delete one Ballot
     *   }
     * })
     * 
     */
    delete<T extends BallotDeleteArgs>(args: SelectSubset<T, BallotDeleteArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Ballot.
     * @param {BallotUpdateArgs} args - Arguments to update one Ballot.
     * @example
     * // Update one Ballot
     * const ballot = await prisma.ballot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BallotUpdateArgs>(args: SelectSubset<T, BallotUpdateArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Ballots.
     * @param {BallotDeleteManyArgs} args - Arguments to filter Ballots to delete.
     * @example
     * // Delete a few Ballots
     * const { count } = await prisma.ballot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BallotDeleteManyArgs>(args?: SelectSubset<T, BallotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ballots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ballots
     * const ballot = await prisma.ballot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BallotUpdateManyArgs>(args: SelectSubset<T, BallotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ballot.
     * @param {BallotUpsertArgs} args - Arguments to update or create a Ballot.
     * @example
     * // Update or create a Ballot
     * const ballot = await prisma.ballot.upsert({
     *   create: {
     *     // ... data to create a Ballot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ballot we want to update
     *   }
     * })
     */
    upsert<T extends BallotUpsertArgs>(args: SelectSubset<T, BallotUpsertArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Ballots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotCountArgs} args - Arguments to filter Ballots to count.
     * @example
     * // Count the number of Ballots
     * const count = await prisma.ballot.count({
     *   where: {
     *     // ... the filter for the Ballots we want to count
     *   }
     * })
    **/
    count<T extends BallotCountArgs>(
      args?: Subset<T, BallotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BallotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ballot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BallotAggregateArgs>(args: Subset<T, BallotAggregateArgs>): Prisma.PrismaPromise<GetBallotAggregateType<T>>

    /**
     * Group by Ballot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BallotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BallotGroupByArgs['orderBy'] }
        : { orderBy?: BallotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BallotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBallotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ballot model
   */
  readonly fields: BallotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ballot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BallotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ballot model
   */ 
  interface BallotFieldRefs {
    readonly id: FieldRef<"Ballot", 'Int'>
    readonly anonymousToken: FieldRef<"Ballot", 'String'>
    readonly choices: FieldRef<"Ballot", 'String'>
    readonly castAt: FieldRef<"Ballot", 'DateTime'>
    readonly hash: FieldRef<"Ballot", 'String'>
    readonly prevHash: FieldRef<"Ballot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Ballot findUnique
   */
  export type BallotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Filter, which Ballot to fetch.
     */
    where: BallotWhereUniqueInput
  }

  /**
   * Ballot findUniqueOrThrow
   */
  export type BallotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Filter, which Ballot to fetch.
     */
    where: BallotWhereUniqueInput
  }

  /**
   * Ballot findFirst
   */
  export type BallotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Filter, which Ballot to fetch.
     */
    where?: BallotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ballots to fetch.
     */
    orderBy?: BallotOrderByWithRelationInput | BallotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ballots.
     */
    cursor?: BallotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ballots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ballots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ballots.
     */
    distinct?: BallotScalarFieldEnum | BallotScalarFieldEnum[]
  }

  /**
   * Ballot findFirstOrThrow
   */
  export type BallotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Filter, which Ballot to fetch.
     */
    where?: BallotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ballots to fetch.
     */
    orderBy?: BallotOrderByWithRelationInput | BallotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ballots.
     */
    cursor?: BallotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ballots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ballots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ballots.
     */
    distinct?: BallotScalarFieldEnum | BallotScalarFieldEnum[]
  }

  /**
   * Ballot findMany
   */
  export type BallotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Filter, which Ballots to fetch.
     */
    where?: BallotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ballots to fetch.
     */
    orderBy?: BallotOrderByWithRelationInput | BallotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ballots.
     */
    cursor?: BallotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ballots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ballots.
     */
    skip?: number
    distinct?: BallotScalarFieldEnum | BallotScalarFieldEnum[]
  }

  /**
   * Ballot create
   */
  export type BallotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * The data needed to create a Ballot.
     */
    data: XOR<BallotCreateInput, BallotUncheckedCreateInput>
  }

  /**
   * Ballot createMany
   */
  export type BallotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ballots.
     */
    data: BallotCreateManyInput | BallotCreateManyInput[]
  }

  /**
   * Ballot createManyAndReturn
   */
  export type BallotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Ballots.
     */
    data: BallotCreateManyInput | BallotCreateManyInput[]
  }

  /**
   * Ballot update
   */
  export type BallotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * The data needed to update a Ballot.
     */
    data: XOR<BallotUpdateInput, BallotUncheckedUpdateInput>
    /**
     * Choose, which Ballot to update.
     */
    where: BallotWhereUniqueInput
  }

  /**
   * Ballot updateMany
   */
  export type BallotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ballots.
     */
    data: XOR<BallotUpdateManyMutationInput, BallotUncheckedUpdateManyInput>
    /**
     * Filter which Ballots to update
     */
    where?: BallotWhereInput
  }

  /**
   * Ballot upsert
   */
  export type BallotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * The filter to search for the Ballot to update in case it exists.
     */
    where: BallotWhereUniqueInput
    /**
     * In case the Ballot found by the `where` argument doesn't exist, create a new Ballot with this data.
     */
    create: XOR<BallotCreateInput, BallotUncheckedCreateInput>
    /**
     * In case the Ballot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BallotUpdateInput, BallotUncheckedUpdateInput>
  }

  /**
   * Ballot delete
   */
  export type BallotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Filter which Ballot to delete.
     */
    where: BallotWhereUniqueInput
  }

  /**
   * Ballot deleteMany
   */
  export type BallotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ballots to delete
     */
    where?: BallotWhereInput
  }

  /**
   * Ballot without action
   */
  export type BallotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    id: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    id: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: number | null
    action: string | null
    timestamp: Date | null
    details: string | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: number | null
    action: string | null
    timestamp: Date | null
    details: string | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    timestamp: number
    details: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    id?: true
  }

  export type AuditLogSumAggregateInputType = {
    id?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    timestamp?: true
    details?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    timestamp?: true
    details?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    timestamp?: true
    details?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: number
    action: string
    timestamp: Date
    details: string
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    timestamp?: boolean
    details?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    timestamp?: boolean
    details?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    timestamp?: boolean
    details?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      action: string
      timestamp: Date
      details: string
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'Int'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
    readonly details: FieldRef<"AuditLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
  }


  /**
   * Model ElectionState
   */

  export type AggregateElectionState = {
    _count: ElectionStateCountAggregateOutputType | null
    _min: ElectionStateMinAggregateOutputType | null
    _max: ElectionStateMaxAggregateOutputType | null
  }

  export type ElectionStateMinAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type ElectionStateMaxAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type ElectionStateCountAggregateOutputType = {
    key: number
    value: number
    _all: number
  }


  export type ElectionStateMinAggregateInputType = {
    key?: true
    value?: true
  }

  export type ElectionStateMaxAggregateInputType = {
    key?: true
    value?: true
  }

  export type ElectionStateCountAggregateInputType = {
    key?: true
    value?: true
    _all?: true
  }

  export type ElectionStateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElectionState to aggregate.
     */
    where?: ElectionStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectionStates to fetch.
     */
    orderBy?: ElectionStateOrderByWithRelationInput | ElectionStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElectionStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectionStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectionStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ElectionStates
    **/
    _count?: true | ElectionStateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElectionStateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElectionStateMaxAggregateInputType
  }

  export type GetElectionStateAggregateType<T extends ElectionStateAggregateArgs> = {
        [P in keyof T & keyof AggregateElectionState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElectionState[P]>
      : GetScalarType<T[P], AggregateElectionState[P]>
  }




  export type ElectionStateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElectionStateWhereInput
    orderBy?: ElectionStateOrderByWithAggregationInput | ElectionStateOrderByWithAggregationInput[]
    by: ElectionStateScalarFieldEnum[] | ElectionStateScalarFieldEnum
    having?: ElectionStateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElectionStateCountAggregateInputType | true
    _min?: ElectionStateMinAggregateInputType
    _max?: ElectionStateMaxAggregateInputType
  }

  export type ElectionStateGroupByOutputType = {
    key: string
    value: string
    _count: ElectionStateCountAggregateOutputType | null
    _min: ElectionStateMinAggregateOutputType | null
    _max: ElectionStateMaxAggregateOutputType | null
  }

  type GetElectionStateGroupByPayload<T extends ElectionStateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElectionStateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElectionStateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElectionStateGroupByOutputType[P]>
            : GetScalarType<T[P], ElectionStateGroupByOutputType[P]>
        }
      >
    >


  export type ElectionStateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["electionState"]>

  export type ElectionStateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["electionState"]>

  export type ElectionStateSelectScalar = {
    key?: boolean
    value?: boolean
  }


  export type $ElectionStatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ElectionState"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
    }, ExtArgs["result"]["electionState"]>
    composites: {}
  }

  type ElectionStateGetPayload<S extends boolean | null | undefined | ElectionStateDefaultArgs> = $Result.GetResult<Prisma.$ElectionStatePayload, S>

  type ElectionStateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ElectionStateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ElectionStateCountAggregateInputType | true
    }

  export interface ElectionStateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ElectionState'], meta: { name: 'ElectionState' } }
    /**
     * Find zero or one ElectionState that matches the filter.
     * @param {ElectionStateFindUniqueArgs} args - Arguments to find a ElectionState
     * @example
     * // Get one ElectionState
     * const electionState = await prisma.electionState.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElectionStateFindUniqueArgs>(args: SelectSubset<T, ElectionStateFindUniqueArgs<ExtArgs>>): Prisma__ElectionStateClient<$Result.GetResult<Prisma.$ElectionStatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ElectionState that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ElectionStateFindUniqueOrThrowArgs} args - Arguments to find a ElectionState
     * @example
     * // Get one ElectionState
     * const electionState = await prisma.electionState.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElectionStateFindUniqueOrThrowArgs>(args: SelectSubset<T, ElectionStateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElectionStateClient<$Result.GetResult<Prisma.$ElectionStatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ElectionState that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStateFindFirstArgs} args - Arguments to find a ElectionState
     * @example
     * // Get one ElectionState
     * const electionState = await prisma.electionState.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElectionStateFindFirstArgs>(args?: SelectSubset<T, ElectionStateFindFirstArgs<ExtArgs>>): Prisma__ElectionStateClient<$Result.GetResult<Prisma.$ElectionStatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ElectionState that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStateFindFirstOrThrowArgs} args - Arguments to find a ElectionState
     * @example
     * // Get one ElectionState
     * const electionState = await prisma.electionState.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElectionStateFindFirstOrThrowArgs>(args?: SelectSubset<T, ElectionStateFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElectionStateClient<$Result.GetResult<Prisma.$ElectionStatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ElectionStates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ElectionStates
     * const electionStates = await prisma.electionState.findMany()
     * 
     * // Get first 10 ElectionStates
     * const electionStates = await prisma.electionState.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const electionStateWithKeyOnly = await prisma.electionState.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends ElectionStateFindManyArgs>(args?: SelectSubset<T, ElectionStateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectionStatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ElectionState.
     * @param {ElectionStateCreateArgs} args - Arguments to create a ElectionState.
     * @example
     * // Create one ElectionState
     * const ElectionState = await prisma.electionState.create({
     *   data: {
     *     // ... data to create a ElectionState
     *   }
     * })
     * 
     */
    create<T extends ElectionStateCreateArgs>(args: SelectSubset<T, ElectionStateCreateArgs<ExtArgs>>): Prisma__ElectionStateClient<$Result.GetResult<Prisma.$ElectionStatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ElectionStates.
     * @param {ElectionStateCreateManyArgs} args - Arguments to create many ElectionStates.
     * @example
     * // Create many ElectionStates
     * const electionState = await prisma.electionState.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElectionStateCreateManyArgs>(args?: SelectSubset<T, ElectionStateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ElectionStates and returns the data saved in the database.
     * @param {ElectionStateCreateManyAndReturnArgs} args - Arguments to create many ElectionStates.
     * @example
     * // Create many ElectionStates
     * const electionState = await prisma.electionState.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ElectionStates and only return the `key`
     * const electionStateWithKeyOnly = await prisma.electionState.createManyAndReturn({ 
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ElectionStateCreateManyAndReturnArgs>(args?: SelectSubset<T, ElectionStateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectionStatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ElectionState.
     * @param {ElectionStateDeleteArgs} args - Arguments to delete one ElectionState.
     * @example
     * // Delete one ElectionState
     * const ElectionState = await prisma.electionState.delete({
     *   where: {
     *     // ... filter to delete one ElectionState
     *   }
     * })
     * 
     */
    delete<T extends ElectionStateDeleteArgs>(args: SelectSubset<T, ElectionStateDeleteArgs<ExtArgs>>): Prisma__ElectionStateClient<$Result.GetResult<Prisma.$ElectionStatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ElectionState.
     * @param {ElectionStateUpdateArgs} args - Arguments to update one ElectionState.
     * @example
     * // Update one ElectionState
     * const electionState = await prisma.electionState.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElectionStateUpdateArgs>(args: SelectSubset<T, ElectionStateUpdateArgs<ExtArgs>>): Prisma__ElectionStateClient<$Result.GetResult<Prisma.$ElectionStatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ElectionStates.
     * @param {ElectionStateDeleteManyArgs} args - Arguments to filter ElectionStates to delete.
     * @example
     * // Delete a few ElectionStates
     * const { count } = await prisma.electionState.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElectionStateDeleteManyArgs>(args?: SelectSubset<T, ElectionStateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ElectionStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ElectionStates
     * const electionState = await prisma.electionState.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElectionStateUpdateManyArgs>(args: SelectSubset<T, ElectionStateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ElectionState.
     * @param {ElectionStateUpsertArgs} args - Arguments to update or create a ElectionState.
     * @example
     * // Update or create a ElectionState
     * const electionState = await prisma.electionState.upsert({
     *   create: {
     *     // ... data to create a ElectionState
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ElectionState we want to update
     *   }
     * })
     */
    upsert<T extends ElectionStateUpsertArgs>(args: SelectSubset<T, ElectionStateUpsertArgs<ExtArgs>>): Prisma__ElectionStateClient<$Result.GetResult<Prisma.$ElectionStatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ElectionStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStateCountArgs} args - Arguments to filter ElectionStates to count.
     * @example
     * // Count the number of ElectionStates
     * const count = await prisma.electionState.count({
     *   where: {
     *     // ... the filter for the ElectionStates we want to count
     *   }
     * })
    **/
    count<T extends ElectionStateCountArgs>(
      args?: Subset<T, ElectionStateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElectionStateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ElectionState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElectionStateAggregateArgs>(args: Subset<T, ElectionStateAggregateArgs>): Prisma.PrismaPromise<GetElectionStateAggregateType<T>>

    /**
     * Group by ElectionState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElectionStateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElectionStateGroupByArgs['orderBy'] }
        : { orderBy?: ElectionStateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElectionStateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElectionStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ElectionState model
   */
  readonly fields: ElectionStateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ElectionState.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElectionStateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ElectionState model
   */ 
  interface ElectionStateFieldRefs {
    readonly key: FieldRef<"ElectionState", 'String'>
    readonly value: FieldRef<"ElectionState", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ElectionState findUnique
   */
  export type ElectionStateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionState
     */
    select?: ElectionStateSelect<ExtArgs> | null
    /**
     * Filter, which ElectionState to fetch.
     */
    where: ElectionStateWhereUniqueInput
  }

  /**
   * ElectionState findUniqueOrThrow
   */
  export type ElectionStateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionState
     */
    select?: ElectionStateSelect<ExtArgs> | null
    /**
     * Filter, which ElectionState to fetch.
     */
    where: ElectionStateWhereUniqueInput
  }

  /**
   * ElectionState findFirst
   */
  export type ElectionStateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionState
     */
    select?: ElectionStateSelect<ExtArgs> | null
    /**
     * Filter, which ElectionState to fetch.
     */
    where?: ElectionStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectionStates to fetch.
     */
    orderBy?: ElectionStateOrderByWithRelationInput | ElectionStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElectionStates.
     */
    cursor?: ElectionStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectionStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectionStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElectionStates.
     */
    distinct?: ElectionStateScalarFieldEnum | ElectionStateScalarFieldEnum[]
  }

  /**
   * ElectionState findFirstOrThrow
   */
  export type ElectionStateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionState
     */
    select?: ElectionStateSelect<ExtArgs> | null
    /**
     * Filter, which ElectionState to fetch.
     */
    where?: ElectionStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectionStates to fetch.
     */
    orderBy?: ElectionStateOrderByWithRelationInput | ElectionStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElectionStates.
     */
    cursor?: ElectionStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectionStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectionStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElectionStates.
     */
    distinct?: ElectionStateScalarFieldEnum | ElectionStateScalarFieldEnum[]
  }

  /**
   * ElectionState findMany
   */
  export type ElectionStateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionState
     */
    select?: ElectionStateSelect<ExtArgs> | null
    /**
     * Filter, which ElectionStates to fetch.
     */
    where?: ElectionStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectionStates to fetch.
     */
    orderBy?: ElectionStateOrderByWithRelationInput | ElectionStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ElectionStates.
     */
    cursor?: ElectionStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectionStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectionStates.
     */
    skip?: number
    distinct?: ElectionStateScalarFieldEnum | ElectionStateScalarFieldEnum[]
  }

  /**
   * ElectionState create
   */
  export type ElectionStateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionState
     */
    select?: ElectionStateSelect<ExtArgs> | null
    /**
     * The data needed to create a ElectionState.
     */
    data: XOR<ElectionStateCreateInput, ElectionStateUncheckedCreateInput>
  }

  /**
   * ElectionState createMany
   */
  export type ElectionStateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ElectionStates.
     */
    data: ElectionStateCreateManyInput | ElectionStateCreateManyInput[]
  }

  /**
   * ElectionState createManyAndReturn
   */
  export type ElectionStateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionState
     */
    select?: ElectionStateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ElectionStates.
     */
    data: ElectionStateCreateManyInput | ElectionStateCreateManyInput[]
  }

  /**
   * ElectionState update
   */
  export type ElectionStateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionState
     */
    select?: ElectionStateSelect<ExtArgs> | null
    /**
     * The data needed to update a ElectionState.
     */
    data: XOR<ElectionStateUpdateInput, ElectionStateUncheckedUpdateInput>
    /**
     * Choose, which ElectionState to update.
     */
    where: ElectionStateWhereUniqueInput
  }

  /**
   * ElectionState updateMany
   */
  export type ElectionStateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ElectionStates.
     */
    data: XOR<ElectionStateUpdateManyMutationInput, ElectionStateUncheckedUpdateManyInput>
    /**
     * Filter which ElectionStates to update
     */
    where?: ElectionStateWhereInput
  }

  /**
   * ElectionState upsert
   */
  export type ElectionStateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionState
     */
    select?: ElectionStateSelect<ExtArgs> | null
    /**
     * The filter to search for the ElectionState to update in case it exists.
     */
    where: ElectionStateWhereUniqueInput
    /**
     * In case the ElectionState found by the `where` argument doesn't exist, create a new ElectionState with this data.
     */
    create: XOR<ElectionStateCreateInput, ElectionStateUncheckedCreateInput>
    /**
     * In case the ElectionState was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElectionStateUpdateInput, ElectionStateUncheckedUpdateInput>
  }

  /**
   * ElectionState delete
   */
  export type ElectionStateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionState
     */
    select?: ElectionStateSelect<ExtArgs> | null
    /**
     * Filter which ElectionState to delete.
     */
    where: ElectionStateWhereUniqueInput
  }

  /**
   * ElectionState deleteMany
   */
  export type ElectionStateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElectionStates to delete
     */
    where?: ElectionStateWhereInput
  }

  /**
   * ElectionState without action
   */
  export type ElectionStateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionState
     */
    select?: ElectionStateSelect<ExtArgs> | null
  }


  /**
   * Model DecryptionShare
   */

  export type AggregateDecryptionShare = {
    _count: DecryptionShareCountAggregateOutputType | null
    _avg: DecryptionShareAvgAggregateOutputType | null
    _sum: DecryptionShareSumAggregateOutputType | null
    _min: DecryptionShareMinAggregateOutputType | null
    _max: DecryptionShareMaxAggregateOutputType | null
  }

  export type DecryptionShareAvgAggregateOutputType = {
    id: number | null
  }

  export type DecryptionShareSumAggregateOutputType = {
    id: number | null
  }

  export type DecryptionShareMinAggregateOutputType = {
    id: number | null
    adminId: string | null
    share: string | null
    submittedAt: Date | null
  }

  export type DecryptionShareMaxAggregateOutputType = {
    id: number | null
    adminId: string | null
    share: string | null
    submittedAt: Date | null
  }

  export type DecryptionShareCountAggregateOutputType = {
    id: number
    adminId: number
    share: number
    submittedAt: number
    _all: number
  }


  export type DecryptionShareAvgAggregateInputType = {
    id?: true
  }

  export type DecryptionShareSumAggregateInputType = {
    id?: true
  }

  export type DecryptionShareMinAggregateInputType = {
    id?: true
    adminId?: true
    share?: true
    submittedAt?: true
  }

  export type DecryptionShareMaxAggregateInputType = {
    id?: true
    adminId?: true
    share?: true
    submittedAt?: true
  }

  export type DecryptionShareCountAggregateInputType = {
    id?: true
    adminId?: true
    share?: true
    submittedAt?: true
    _all?: true
  }

  export type DecryptionShareAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DecryptionShare to aggregate.
     */
    where?: DecryptionShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DecryptionShares to fetch.
     */
    orderBy?: DecryptionShareOrderByWithRelationInput | DecryptionShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DecryptionShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DecryptionShares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DecryptionShares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DecryptionShares
    **/
    _count?: true | DecryptionShareCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DecryptionShareAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DecryptionShareSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DecryptionShareMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DecryptionShareMaxAggregateInputType
  }

  export type GetDecryptionShareAggregateType<T extends DecryptionShareAggregateArgs> = {
        [P in keyof T & keyof AggregateDecryptionShare]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDecryptionShare[P]>
      : GetScalarType<T[P], AggregateDecryptionShare[P]>
  }




  export type DecryptionShareGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DecryptionShareWhereInput
    orderBy?: DecryptionShareOrderByWithAggregationInput | DecryptionShareOrderByWithAggregationInput[]
    by: DecryptionShareScalarFieldEnum[] | DecryptionShareScalarFieldEnum
    having?: DecryptionShareScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DecryptionShareCountAggregateInputType | true
    _avg?: DecryptionShareAvgAggregateInputType
    _sum?: DecryptionShareSumAggregateInputType
    _min?: DecryptionShareMinAggregateInputType
    _max?: DecryptionShareMaxAggregateInputType
  }

  export type DecryptionShareGroupByOutputType = {
    id: number
    adminId: string
    share: string
    submittedAt: Date
    _count: DecryptionShareCountAggregateOutputType | null
    _avg: DecryptionShareAvgAggregateOutputType | null
    _sum: DecryptionShareSumAggregateOutputType | null
    _min: DecryptionShareMinAggregateOutputType | null
    _max: DecryptionShareMaxAggregateOutputType | null
  }

  type GetDecryptionShareGroupByPayload<T extends DecryptionShareGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DecryptionShareGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DecryptionShareGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DecryptionShareGroupByOutputType[P]>
            : GetScalarType<T[P], DecryptionShareGroupByOutputType[P]>
        }
      >
    >


  export type DecryptionShareSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    share?: boolean
    submittedAt?: boolean
  }, ExtArgs["result"]["decryptionShare"]>

  export type DecryptionShareSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    share?: boolean
    submittedAt?: boolean
  }, ExtArgs["result"]["decryptionShare"]>

  export type DecryptionShareSelectScalar = {
    id?: boolean
    adminId?: boolean
    share?: boolean
    submittedAt?: boolean
  }


  export type $DecryptionSharePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DecryptionShare"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      adminId: string
      share: string
      submittedAt: Date
    }, ExtArgs["result"]["decryptionShare"]>
    composites: {}
  }

  type DecryptionShareGetPayload<S extends boolean | null | undefined | DecryptionShareDefaultArgs> = $Result.GetResult<Prisma.$DecryptionSharePayload, S>

  type DecryptionShareCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DecryptionShareFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DecryptionShareCountAggregateInputType | true
    }

  export interface DecryptionShareDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DecryptionShare'], meta: { name: 'DecryptionShare' } }
    /**
     * Find zero or one DecryptionShare that matches the filter.
     * @param {DecryptionShareFindUniqueArgs} args - Arguments to find a DecryptionShare
     * @example
     * // Get one DecryptionShare
     * const decryptionShare = await prisma.decryptionShare.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DecryptionShareFindUniqueArgs>(args: SelectSubset<T, DecryptionShareFindUniqueArgs<ExtArgs>>): Prisma__DecryptionShareClient<$Result.GetResult<Prisma.$DecryptionSharePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DecryptionShare that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DecryptionShareFindUniqueOrThrowArgs} args - Arguments to find a DecryptionShare
     * @example
     * // Get one DecryptionShare
     * const decryptionShare = await prisma.decryptionShare.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DecryptionShareFindUniqueOrThrowArgs>(args: SelectSubset<T, DecryptionShareFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DecryptionShareClient<$Result.GetResult<Prisma.$DecryptionSharePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DecryptionShare that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecryptionShareFindFirstArgs} args - Arguments to find a DecryptionShare
     * @example
     * // Get one DecryptionShare
     * const decryptionShare = await prisma.decryptionShare.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DecryptionShareFindFirstArgs>(args?: SelectSubset<T, DecryptionShareFindFirstArgs<ExtArgs>>): Prisma__DecryptionShareClient<$Result.GetResult<Prisma.$DecryptionSharePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DecryptionShare that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecryptionShareFindFirstOrThrowArgs} args - Arguments to find a DecryptionShare
     * @example
     * // Get one DecryptionShare
     * const decryptionShare = await prisma.decryptionShare.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DecryptionShareFindFirstOrThrowArgs>(args?: SelectSubset<T, DecryptionShareFindFirstOrThrowArgs<ExtArgs>>): Prisma__DecryptionShareClient<$Result.GetResult<Prisma.$DecryptionSharePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DecryptionShares that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecryptionShareFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DecryptionShares
     * const decryptionShares = await prisma.decryptionShare.findMany()
     * 
     * // Get first 10 DecryptionShares
     * const decryptionShares = await prisma.decryptionShare.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const decryptionShareWithIdOnly = await prisma.decryptionShare.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DecryptionShareFindManyArgs>(args?: SelectSubset<T, DecryptionShareFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DecryptionSharePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DecryptionShare.
     * @param {DecryptionShareCreateArgs} args - Arguments to create a DecryptionShare.
     * @example
     * // Create one DecryptionShare
     * const DecryptionShare = await prisma.decryptionShare.create({
     *   data: {
     *     // ... data to create a DecryptionShare
     *   }
     * })
     * 
     */
    create<T extends DecryptionShareCreateArgs>(args: SelectSubset<T, DecryptionShareCreateArgs<ExtArgs>>): Prisma__DecryptionShareClient<$Result.GetResult<Prisma.$DecryptionSharePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DecryptionShares.
     * @param {DecryptionShareCreateManyArgs} args - Arguments to create many DecryptionShares.
     * @example
     * // Create many DecryptionShares
     * const decryptionShare = await prisma.decryptionShare.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DecryptionShareCreateManyArgs>(args?: SelectSubset<T, DecryptionShareCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DecryptionShares and returns the data saved in the database.
     * @param {DecryptionShareCreateManyAndReturnArgs} args - Arguments to create many DecryptionShares.
     * @example
     * // Create many DecryptionShares
     * const decryptionShare = await prisma.decryptionShare.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DecryptionShares and only return the `id`
     * const decryptionShareWithIdOnly = await prisma.decryptionShare.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DecryptionShareCreateManyAndReturnArgs>(args?: SelectSubset<T, DecryptionShareCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DecryptionSharePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DecryptionShare.
     * @param {DecryptionShareDeleteArgs} args - Arguments to delete one DecryptionShare.
     * @example
     * // Delete one DecryptionShare
     * const DecryptionShare = await prisma.decryptionShare.delete({
     *   where: {
     *     // ... filter to delete one DecryptionShare
     *   }
     * })
     * 
     */
    delete<T extends DecryptionShareDeleteArgs>(args: SelectSubset<T, DecryptionShareDeleteArgs<ExtArgs>>): Prisma__DecryptionShareClient<$Result.GetResult<Prisma.$DecryptionSharePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DecryptionShare.
     * @param {DecryptionShareUpdateArgs} args - Arguments to update one DecryptionShare.
     * @example
     * // Update one DecryptionShare
     * const decryptionShare = await prisma.decryptionShare.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DecryptionShareUpdateArgs>(args: SelectSubset<T, DecryptionShareUpdateArgs<ExtArgs>>): Prisma__DecryptionShareClient<$Result.GetResult<Prisma.$DecryptionSharePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DecryptionShares.
     * @param {DecryptionShareDeleteManyArgs} args - Arguments to filter DecryptionShares to delete.
     * @example
     * // Delete a few DecryptionShares
     * const { count } = await prisma.decryptionShare.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DecryptionShareDeleteManyArgs>(args?: SelectSubset<T, DecryptionShareDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DecryptionShares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecryptionShareUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DecryptionShares
     * const decryptionShare = await prisma.decryptionShare.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DecryptionShareUpdateManyArgs>(args: SelectSubset<T, DecryptionShareUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DecryptionShare.
     * @param {DecryptionShareUpsertArgs} args - Arguments to update or create a DecryptionShare.
     * @example
     * // Update or create a DecryptionShare
     * const decryptionShare = await prisma.decryptionShare.upsert({
     *   create: {
     *     // ... data to create a DecryptionShare
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DecryptionShare we want to update
     *   }
     * })
     */
    upsert<T extends DecryptionShareUpsertArgs>(args: SelectSubset<T, DecryptionShareUpsertArgs<ExtArgs>>): Prisma__DecryptionShareClient<$Result.GetResult<Prisma.$DecryptionSharePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DecryptionShares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecryptionShareCountArgs} args - Arguments to filter DecryptionShares to count.
     * @example
     * // Count the number of DecryptionShares
     * const count = await prisma.decryptionShare.count({
     *   where: {
     *     // ... the filter for the DecryptionShares we want to count
     *   }
     * })
    **/
    count<T extends DecryptionShareCountArgs>(
      args?: Subset<T, DecryptionShareCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DecryptionShareCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DecryptionShare.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecryptionShareAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DecryptionShareAggregateArgs>(args: Subset<T, DecryptionShareAggregateArgs>): Prisma.PrismaPromise<GetDecryptionShareAggregateType<T>>

    /**
     * Group by DecryptionShare.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecryptionShareGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DecryptionShareGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DecryptionShareGroupByArgs['orderBy'] }
        : { orderBy?: DecryptionShareGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DecryptionShareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDecryptionShareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DecryptionShare model
   */
  readonly fields: DecryptionShareFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DecryptionShare.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DecryptionShareClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DecryptionShare model
   */ 
  interface DecryptionShareFieldRefs {
    readonly id: FieldRef<"DecryptionShare", 'Int'>
    readonly adminId: FieldRef<"DecryptionShare", 'String'>
    readonly share: FieldRef<"DecryptionShare", 'String'>
    readonly submittedAt: FieldRef<"DecryptionShare", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DecryptionShare findUnique
   */
  export type DecryptionShareFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecryptionShare
     */
    select?: DecryptionShareSelect<ExtArgs> | null
    /**
     * Filter, which DecryptionShare to fetch.
     */
    where: DecryptionShareWhereUniqueInput
  }

  /**
   * DecryptionShare findUniqueOrThrow
   */
  export type DecryptionShareFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecryptionShare
     */
    select?: DecryptionShareSelect<ExtArgs> | null
    /**
     * Filter, which DecryptionShare to fetch.
     */
    where: DecryptionShareWhereUniqueInput
  }

  /**
   * DecryptionShare findFirst
   */
  export type DecryptionShareFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecryptionShare
     */
    select?: DecryptionShareSelect<ExtArgs> | null
    /**
     * Filter, which DecryptionShare to fetch.
     */
    where?: DecryptionShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DecryptionShares to fetch.
     */
    orderBy?: DecryptionShareOrderByWithRelationInput | DecryptionShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DecryptionShares.
     */
    cursor?: DecryptionShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DecryptionShares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DecryptionShares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DecryptionShares.
     */
    distinct?: DecryptionShareScalarFieldEnum | DecryptionShareScalarFieldEnum[]
  }

  /**
   * DecryptionShare findFirstOrThrow
   */
  export type DecryptionShareFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecryptionShare
     */
    select?: DecryptionShareSelect<ExtArgs> | null
    /**
     * Filter, which DecryptionShare to fetch.
     */
    where?: DecryptionShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DecryptionShares to fetch.
     */
    orderBy?: DecryptionShareOrderByWithRelationInput | DecryptionShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DecryptionShares.
     */
    cursor?: DecryptionShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DecryptionShares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DecryptionShares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DecryptionShares.
     */
    distinct?: DecryptionShareScalarFieldEnum | DecryptionShareScalarFieldEnum[]
  }

  /**
   * DecryptionShare findMany
   */
  export type DecryptionShareFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecryptionShare
     */
    select?: DecryptionShareSelect<ExtArgs> | null
    /**
     * Filter, which DecryptionShares to fetch.
     */
    where?: DecryptionShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DecryptionShares to fetch.
     */
    orderBy?: DecryptionShareOrderByWithRelationInput | DecryptionShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DecryptionShares.
     */
    cursor?: DecryptionShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DecryptionShares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DecryptionShares.
     */
    skip?: number
    distinct?: DecryptionShareScalarFieldEnum | DecryptionShareScalarFieldEnum[]
  }

  /**
   * DecryptionShare create
   */
  export type DecryptionShareCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecryptionShare
     */
    select?: DecryptionShareSelect<ExtArgs> | null
    /**
     * The data needed to create a DecryptionShare.
     */
    data: XOR<DecryptionShareCreateInput, DecryptionShareUncheckedCreateInput>
  }

  /**
   * DecryptionShare createMany
   */
  export type DecryptionShareCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DecryptionShares.
     */
    data: DecryptionShareCreateManyInput | DecryptionShareCreateManyInput[]
  }

  /**
   * DecryptionShare createManyAndReturn
   */
  export type DecryptionShareCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecryptionShare
     */
    select?: DecryptionShareSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DecryptionShares.
     */
    data: DecryptionShareCreateManyInput | DecryptionShareCreateManyInput[]
  }

  /**
   * DecryptionShare update
   */
  export type DecryptionShareUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecryptionShare
     */
    select?: DecryptionShareSelect<ExtArgs> | null
    /**
     * The data needed to update a DecryptionShare.
     */
    data: XOR<DecryptionShareUpdateInput, DecryptionShareUncheckedUpdateInput>
    /**
     * Choose, which DecryptionShare to update.
     */
    where: DecryptionShareWhereUniqueInput
  }

  /**
   * DecryptionShare updateMany
   */
  export type DecryptionShareUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DecryptionShares.
     */
    data: XOR<DecryptionShareUpdateManyMutationInput, DecryptionShareUncheckedUpdateManyInput>
    /**
     * Filter which DecryptionShares to update
     */
    where?: DecryptionShareWhereInput
  }

  /**
   * DecryptionShare upsert
   */
  export type DecryptionShareUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecryptionShare
     */
    select?: DecryptionShareSelect<ExtArgs> | null
    /**
     * The filter to search for the DecryptionShare to update in case it exists.
     */
    where: DecryptionShareWhereUniqueInput
    /**
     * In case the DecryptionShare found by the `where` argument doesn't exist, create a new DecryptionShare with this data.
     */
    create: XOR<DecryptionShareCreateInput, DecryptionShareUncheckedCreateInput>
    /**
     * In case the DecryptionShare was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DecryptionShareUpdateInput, DecryptionShareUncheckedUpdateInput>
  }

  /**
   * DecryptionShare delete
   */
  export type DecryptionShareDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecryptionShare
     */
    select?: DecryptionShareSelect<ExtArgs> | null
    /**
     * Filter which DecryptionShare to delete.
     */
    where: DecryptionShareWhereUniqueInput
  }

  /**
   * DecryptionShare deleteMany
   */
  export type DecryptionShareDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DecryptionShares to delete
     */
    where?: DecryptionShareWhereInput
  }

  /**
   * DecryptionShare without action
   */
  export type DecryptionShareDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecryptionShare
     */
    select?: DecryptionShareSelect<ExtArgs> | null
  }


  /**
   * Model ReceiptLookup
   */

  export type AggregateReceiptLookup = {
    _count: ReceiptLookupCountAggregateOutputType | null
    _avg: ReceiptLookupAvgAggregateOutputType | null
    _sum: ReceiptLookupSumAggregateOutputType | null
    _min: ReceiptLookupMinAggregateOutputType | null
    _max: ReceiptLookupMaxAggregateOutputType | null
  }

  export type ReceiptLookupAvgAggregateOutputType = {
    id: number | null
  }

  export type ReceiptLookupSumAggregateOutputType = {
    id: number | null
  }

  export type ReceiptLookupMinAggregateOutputType = {
    id: number | null
    tokenHash: string | null
    choices: string | null
    createdAt: Date | null
  }

  export type ReceiptLookupMaxAggregateOutputType = {
    id: number | null
    tokenHash: string | null
    choices: string | null
    createdAt: Date | null
  }

  export type ReceiptLookupCountAggregateOutputType = {
    id: number
    tokenHash: number
    choices: number
    createdAt: number
    _all: number
  }


  export type ReceiptLookupAvgAggregateInputType = {
    id?: true
  }

  export type ReceiptLookupSumAggregateInputType = {
    id?: true
  }

  export type ReceiptLookupMinAggregateInputType = {
    id?: true
    tokenHash?: true
    choices?: true
    createdAt?: true
  }

  export type ReceiptLookupMaxAggregateInputType = {
    id?: true
    tokenHash?: true
    choices?: true
    createdAt?: true
  }

  export type ReceiptLookupCountAggregateInputType = {
    id?: true
    tokenHash?: true
    choices?: true
    createdAt?: true
    _all?: true
  }

  export type ReceiptLookupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReceiptLookup to aggregate.
     */
    where?: ReceiptLookupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReceiptLookups to fetch.
     */
    orderBy?: ReceiptLookupOrderByWithRelationInput | ReceiptLookupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReceiptLookupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReceiptLookups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReceiptLookups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReceiptLookups
    **/
    _count?: true | ReceiptLookupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReceiptLookupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReceiptLookupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReceiptLookupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReceiptLookupMaxAggregateInputType
  }

  export type GetReceiptLookupAggregateType<T extends ReceiptLookupAggregateArgs> = {
        [P in keyof T & keyof AggregateReceiptLookup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReceiptLookup[P]>
      : GetScalarType<T[P], AggregateReceiptLookup[P]>
  }




  export type ReceiptLookupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptLookupWhereInput
    orderBy?: ReceiptLookupOrderByWithAggregationInput | ReceiptLookupOrderByWithAggregationInput[]
    by: ReceiptLookupScalarFieldEnum[] | ReceiptLookupScalarFieldEnum
    having?: ReceiptLookupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReceiptLookupCountAggregateInputType | true
    _avg?: ReceiptLookupAvgAggregateInputType
    _sum?: ReceiptLookupSumAggregateInputType
    _min?: ReceiptLookupMinAggregateInputType
    _max?: ReceiptLookupMaxAggregateInputType
  }

  export type ReceiptLookupGroupByOutputType = {
    id: number
    tokenHash: string
    choices: string
    createdAt: Date
    _count: ReceiptLookupCountAggregateOutputType | null
    _avg: ReceiptLookupAvgAggregateOutputType | null
    _sum: ReceiptLookupSumAggregateOutputType | null
    _min: ReceiptLookupMinAggregateOutputType | null
    _max: ReceiptLookupMaxAggregateOutputType | null
  }

  type GetReceiptLookupGroupByPayload<T extends ReceiptLookupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReceiptLookupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReceiptLookupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReceiptLookupGroupByOutputType[P]>
            : GetScalarType<T[P], ReceiptLookupGroupByOutputType[P]>
        }
      >
    >


  export type ReceiptLookupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenHash?: boolean
    choices?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["receiptLookup"]>

  export type ReceiptLookupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenHash?: boolean
    choices?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["receiptLookup"]>

  export type ReceiptLookupSelectScalar = {
    id?: boolean
    tokenHash?: boolean
    choices?: boolean
    createdAt?: boolean
  }


  export type $ReceiptLookupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReceiptLookup"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tokenHash: string
      choices: string
      createdAt: Date
    }, ExtArgs["result"]["receiptLookup"]>
    composites: {}
  }

  type ReceiptLookupGetPayload<S extends boolean | null | undefined | ReceiptLookupDefaultArgs> = $Result.GetResult<Prisma.$ReceiptLookupPayload, S>

  type ReceiptLookupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReceiptLookupFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReceiptLookupCountAggregateInputType | true
    }

  export interface ReceiptLookupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReceiptLookup'], meta: { name: 'ReceiptLookup' } }
    /**
     * Find zero or one ReceiptLookup that matches the filter.
     * @param {ReceiptLookupFindUniqueArgs} args - Arguments to find a ReceiptLookup
     * @example
     * // Get one ReceiptLookup
     * const receiptLookup = await prisma.receiptLookup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReceiptLookupFindUniqueArgs>(args: SelectSubset<T, ReceiptLookupFindUniqueArgs<ExtArgs>>): Prisma__ReceiptLookupClient<$Result.GetResult<Prisma.$ReceiptLookupPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReceiptLookup that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReceiptLookupFindUniqueOrThrowArgs} args - Arguments to find a ReceiptLookup
     * @example
     * // Get one ReceiptLookup
     * const receiptLookup = await prisma.receiptLookup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReceiptLookupFindUniqueOrThrowArgs>(args: SelectSubset<T, ReceiptLookupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReceiptLookupClient<$Result.GetResult<Prisma.$ReceiptLookupPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReceiptLookup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptLookupFindFirstArgs} args - Arguments to find a ReceiptLookup
     * @example
     * // Get one ReceiptLookup
     * const receiptLookup = await prisma.receiptLookup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReceiptLookupFindFirstArgs>(args?: SelectSubset<T, ReceiptLookupFindFirstArgs<ExtArgs>>): Prisma__ReceiptLookupClient<$Result.GetResult<Prisma.$ReceiptLookupPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReceiptLookup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptLookupFindFirstOrThrowArgs} args - Arguments to find a ReceiptLookup
     * @example
     * // Get one ReceiptLookup
     * const receiptLookup = await prisma.receiptLookup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReceiptLookupFindFirstOrThrowArgs>(args?: SelectSubset<T, ReceiptLookupFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReceiptLookupClient<$Result.GetResult<Prisma.$ReceiptLookupPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReceiptLookups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptLookupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReceiptLookups
     * const receiptLookups = await prisma.receiptLookup.findMany()
     * 
     * // Get first 10 ReceiptLookups
     * const receiptLookups = await prisma.receiptLookup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const receiptLookupWithIdOnly = await prisma.receiptLookup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReceiptLookupFindManyArgs>(args?: SelectSubset<T, ReceiptLookupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptLookupPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReceiptLookup.
     * @param {ReceiptLookupCreateArgs} args - Arguments to create a ReceiptLookup.
     * @example
     * // Create one ReceiptLookup
     * const ReceiptLookup = await prisma.receiptLookup.create({
     *   data: {
     *     // ... data to create a ReceiptLookup
     *   }
     * })
     * 
     */
    create<T extends ReceiptLookupCreateArgs>(args: SelectSubset<T, ReceiptLookupCreateArgs<ExtArgs>>): Prisma__ReceiptLookupClient<$Result.GetResult<Prisma.$ReceiptLookupPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReceiptLookups.
     * @param {ReceiptLookupCreateManyArgs} args - Arguments to create many ReceiptLookups.
     * @example
     * // Create many ReceiptLookups
     * const receiptLookup = await prisma.receiptLookup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReceiptLookupCreateManyArgs>(args?: SelectSubset<T, ReceiptLookupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReceiptLookups and returns the data saved in the database.
     * @param {ReceiptLookupCreateManyAndReturnArgs} args - Arguments to create many ReceiptLookups.
     * @example
     * // Create many ReceiptLookups
     * const receiptLookup = await prisma.receiptLookup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReceiptLookups and only return the `id`
     * const receiptLookupWithIdOnly = await prisma.receiptLookup.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReceiptLookupCreateManyAndReturnArgs>(args?: SelectSubset<T, ReceiptLookupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptLookupPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReceiptLookup.
     * @param {ReceiptLookupDeleteArgs} args - Arguments to delete one ReceiptLookup.
     * @example
     * // Delete one ReceiptLookup
     * const ReceiptLookup = await prisma.receiptLookup.delete({
     *   where: {
     *     // ... filter to delete one ReceiptLookup
     *   }
     * })
     * 
     */
    delete<T extends ReceiptLookupDeleteArgs>(args: SelectSubset<T, ReceiptLookupDeleteArgs<ExtArgs>>): Prisma__ReceiptLookupClient<$Result.GetResult<Prisma.$ReceiptLookupPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReceiptLookup.
     * @param {ReceiptLookupUpdateArgs} args - Arguments to update one ReceiptLookup.
     * @example
     * // Update one ReceiptLookup
     * const receiptLookup = await prisma.receiptLookup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReceiptLookupUpdateArgs>(args: SelectSubset<T, ReceiptLookupUpdateArgs<ExtArgs>>): Prisma__ReceiptLookupClient<$Result.GetResult<Prisma.$ReceiptLookupPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReceiptLookups.
     * @param {ReceiptLookupDeleteManyArgs} args - Arguments to filter ReceiptLookups to delete.
     * @example
     * // Delete a few ReceiptLookups
     * const { count } = await prisma.receiptLookup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReceiptLookupDeleteManyArgs>(args?: SelectSubset<T, ReceiptLookupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReceiptLookups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptLookupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReceiptLookups
     * const receiptLookup = await prisma.receiptLookup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReceiptLookupUpdateManyArgs>(args: SelectSubset<T, ReceiptLookupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReceiptLookup.
     * @param {ReceiptLookupUpsertArgs} args - Arguments to update or create a ReceiptLookup.
     * @example
     * // Update or create a ReceiptLookup
     * const receiptLookup = await prisma.receiptLookup.upsert({
     *   create: {
     *     // ... data to create a ReceiptLookup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReceiptLookup we want to update
     *   }
     * })
     */
    upsert<T extends ReceiptLookupUpsertArgs>(args: SelectSubset<T, ReceiptLookupUpsertArgs<ExtArgs>>): Prisma__ReceiptLookupClient<$Result.GetResult<Prisma.$ReceiptLookupPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReceiptLookups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptLookupCountArgs} args - Arguments to filter ReceiptLookups to count.
     * @example
     * // Count the number of ReceiptLookups
     * const count = await prisma.receiptLookup.count({
     *   where: {
     *     // ... the filter for the ReceiptLookups we want to count
     *   }
     * })
    **/
    count<T extends ReceiptLookupCountArgs>(
      args?: Subset<T, ReceiptLookupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReceiptLookupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReceiptLookup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptLookupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReceiptLookupAggregateArgs>(args: Subset<T, ReceiptLookupAggregateArgs>): Prisma.PrismaPromise<GetReceiptLookupAggregateType<T>>

    /**
     * Group by ReceiptLookup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptLookupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReceiptLookupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReceiptLookupGroupByArgs['orderBy'] }
        : { orderBy?: ReceiptLookupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReceiptLookupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReceiptLookupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReceiptLookup model
   */
  readonly fields: ReceiptLookupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReceiptLookup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReceiptLookupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReceiptLookup model
   */ 
  interface ReceiptLookupFieldRefs {
    readonly id: FieldRef<"ReceiptLookup", 'Int'>
    readonly tokenHash: FieldRef<"ReceiptLookup", 'String'>
    readonly choices: FieldRef<"ReceiptLookup", 'String'>
    readonly createdAt: FieldRef<"ReceiptLookup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReceiptLookup findUnique
   */
  export type ReceiptLookupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptLookup
     */
    select?: ReceiptLookupSelect<ExtArgs> | null
    /**
     * Filter, which ReceiptLookup to fetch.
     */
    where: ReceiptLookupWhereUniqueInput
  }

  /**
   * ReceiptLookup findUniqueOrThrow
   */
  export type ReceiptLookupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptLookup
     */
    select?: ReceiptLookupSelect<ExtArgs> | null
    /**
     * Filter, which ReceiptLookup to fetch.
     */
    where: ReceiptLookupWhereUniqueInput
  }

  /**
   * ReceiptLookup findFirst
   */
  export type ReceiptLookupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptLookup
     */
    select?: ReceiptLookupSelect<ExtArgs> | null
    /**
     * Filter, which ReceiptLookup to fetch.
     */
    where?: ReceiptLookupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReceiptLookups to fetch.
     */
    orderBy?: ReceiptLookupOrderByWithRelationInput | ReceiptLookupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReceiptLookups.
     */
    cursor?: ReceiptLookupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReceiptLookups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReceiptLookups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReceiptLookups.
     */
    distinct?: ReceiptLookupScalarFieldEnum | ReceiptLookupScalarFieldEnum[]
  }

  /**
   * ReceiptLookup findFirstOrThrow
   */
  export type ReceiptLookupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptLookup
     */
    select?: ReceiptLookupSelect<ExtArgs> | null
    /**
     * Filter, which ReceiptLookup to fetch.
     */
    where?: ReceiptLookupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReceiptLookups to fetch.
     */
    orderBy?: ReceiptLookupOrderByWithRelationInput | ReceiptLookupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReceiptLookups.
     */
    cursor?: ReceiptLookupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReceiptLookups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReceiptLookups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReceiptLookups.
     */
    distinct?: ReceiptLookupScalarFieldEnum | ReceiptLookupScalarFieldEnum[]
  }

  /**
   * ReceiptLookup findMany
   */
  export type ReceiptLookupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptLookup
     */
    select?: ReceiptLookupSelect<ExtArgs> | null
    /**
     * Filter, which ReceiptLookups to fetch.
     */
    where?: ReceiptLookupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReceiptLookups to fetch.
     */
    orderBy?: ReceiptLookupOrderByWithRelationInput | ReceiptLookupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReceiptLookups.
     */
    cursor?: ReceiptLookupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReceiptLookups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReceiptLookups.
     */
    skip?: number
    distinct?: ReceiptLookupScalarFieldEnum | ReceiptLookupScalarFieldEnum[]
  }

  /**
   * ReceiptLookup create
   */
  export type ReceiptLookupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptLookup
     */
    select?: ReceiptLookupSelect<ExtArgs> | null
    /**
     * The data needed to create a ReceiptLookup.
     */
    data: XOR<ReceiptLookupCreateInput, ReceiptLookupUncheckedCreateInput>
  }

  /**
   * ReceiptLookup createMany
   */
  export type ReceiptLookupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReceiptLookups.
     */
    data: ReceiptLookupCreateManyInput | ReceiptLookupCreateManyInput[]
  }

  /**
   * ReceiptLookup createManyAndReturn
   */
  export type ReceiptLookupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptLookup
     */
    select?: ReceiptLookupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReceiptLookups.
     */
    data: ReceiptLookupCreateManyInput | ReceiptLookupCreateManyInput[]
  }

  /**
   * ReceiptLookup update
   */
  export type ReceiptLookupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptLookup
     */
    select?: ReceiptLookupSelect<ExtArgs> | null
    /**
     * The data needed to update a ReceiptLookup.
     */
    data: XOR<ReceiptLookupUpdateInput, ReceiptLookupUncheckedUpdateInput>
    /**
     * Choose, which ReceiptLookup to update.
     */
    where: ReceiptLookupWhereUniqueInput
  }

  /**
   * ReceiptLookup updateMany
   */
  export type ReceiptLookupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReceiptLookups.
     */
    data: XOR<ReceiptLookupUpdateManyMutationInput, ReceiptLookupUncheckedUpdateManyInput>
    /**
     * Filter which ReceiptLookups to update
     */
    where?: ReceiptLookupWhereInput
  }

  /**
   * ReceiptLookup upsert
   */
  export type ReceiptLookupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptLookup
     */
    select?: ReceiptLookupSelect<ExtArgs> | null
    /**
     * The filter to search for the ReceiptLookup to update in case it exists.
     */
    where: ReceiptLookupWhereUniqueInput
    /**
     * In case the ReceiptLookup found by the `where` argument doesn't exist, create a new ReceiptLookup with this data.
     */
    create: XOR<ReceiptLookupCreateInput, ReceiptLookupUncheckedCreateInput>
    /**
     * In case the ReceiptLookup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReceiptLookupUpdateInput, ReceiptLookupUncheckedUpdateInput>
  }

  /**
   * ReceiptLookup delete
   */
  export type ReceiptLookupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptLookup
     */
    select?: ReceiptLookupSelect<ExtArgs> | null
    /**
     * Filter which ReceiptLookup to delete.
     */
    where: ReceiptLookupWhereUniqueInput
  }

  /**
   * ReceiptLookup deleteMany
   */
  export type ReceiptLookupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReceiptLookups to delete
     */
    where?: ReceiptLookupWhereInput
  }

  /**
   * ReceiptLookup without action
   */
  export type ReceiptLookupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptLookup
     */
    select?: ReceiptLookupSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const VoterScalarFieldEnum: {
    studentId: 'studentId',
    hasVoted: 'hasVoted',
    votedAt: 'votedAt',
    department: 'department',
    email: 'email'
  };

  export type VoterScalarFieldEnum = (typeof VoterScalarFieldEnum)[keyof typeof VoterScalarFieldEnum]


  export const BallotScalarFieldEnum: {
    id: 'id',
    anonymousToken: 'anonymousToken',
    choices: 'choices',
    castAt: 'castAt',
    hash: 'hash',
    prevHash: 'prevHash'
  };

  export type BallotScalarFieldEnum = (typeof BallotScalarFieldEnum)[keyof typeof BallotScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    timestamp: 'timestamp',
    details: 'details'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const ElectionStateScalarFieldEnum: {
    key: 'key',
    value: 'value'
  };

  export type ElectionStateScalarFieldEnum = (typeof ElectionStateScalarFieldEnum)[keyof typeof ElectionStateScalarFieldEnum]


  export const DecryptionShareScalarFieldEnum: {
    id: 'id',
    adminId: 'adminId',
    share: 'share',
    submittedAt: 'submittedAt'
  };

  export type DecryptionShareScalarFieldEnum = (typeof DecryptionShareScalarFieldEnum)[keyof typeof DecryptionShareScalarFieldEnum]


  export const ReceiptLookupScalarFieldEnum: {
    id: 'id',
    tokenHash: 'tokenHash',
    choices: 'choices',
    createdAt: 'createdAt'
  };

  export type ReceiptLookupScalarFieldEnum = (typeof ReceiptLookupScalarFieldEnum)[keyof typeof ReceiptLookupScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type VoterWhereInput = {
    AND?: VoterWhereInput | VoterWhereInput[]
    OR?: VoterWhereInput[]
    NOT?: VoterWhereInput | VoterWhereInput[]
    studentId?: StringFilter<"Voter"> | string
    hasVoted?: BoolFilter<"Voter"> | boolean
    votedAt?: DateTimeNullableFilter<"Voter"> | Date | string | null
    department?: StringFilter<"Voter"> | string
    email?: StringFilter<"Voter"> | string
  }

  export type VoterOrderByWithRelationInput = {
    studentId?: SortOrder
    hasVoted?: SortOrder
    votedAt?: SortOrderInput | SortOrder
    department?: SortOrder
    email?: SortOrder
  }

  export type VoterWhereUniqueInput = Prisma.AtLeast<{
    studentId?: string
    AND?: VoterWhereInput | VoterWhereInput[]
    OR?: VoterWhereInput[]
    NOT?: VoterWhereInput | VoterWhereInput[]
    hasVoted?: BoolFilter<"Voter"> | boolean
    votedAt?: DateTimeNullableFilter<"Voter"> | Date | string | null
    department?: StringFilter<"Voter"> | string
    email?: StringFilter<"Voter"> | string
  }, "studentId">

  export type VoterOrderByWithAggregationInput = {
    studentId?: SortOrder
    hasVoted?: SortOrder
    votedAt?: SortOrderInput | SortOrder
    department?: SortOrder
    email?: SortOrder
    _count?: VoterCountOrderByAggregateInput
    _max?: VoterMaxOrderByAggregateInput
    _min?: VoterMinOrderByAggregateInput
  }

  export type VoterScalarWhereWithAggregatesInput = {
    AND?: VoterScalarWhereWithAggregatesInput | VoterScalarWhereWithAggregatesInput[]
    OR?: VoterScalarWhereWithAggregatesInput[]
    NOT?: VoterScalarWhereWithAggregatesInput | VoterScalarWhereWithAggregatesInput[]
    studentId?: StringWithAggregatesFilter<"Voter"> | string
    hasVoted?: BoolWithAggregatesFilter<"Voter"> | boolean
    votedAt?: DateTimeNullableWithAggregatesFilter<"Voter"> | Date | string | null
    department?: StringWithAggregatesFilter<"Voter"> | string
    email?: StringWithAggregatesFilter<"Voter"> | string
  }

  export type BallotWhereInput = {
    AND?: BallotWhereInput | BallotWhereInput[]
    OR?: BallotWhereInput[]
    NOT?: BallotWhereInput | BallotWhereInput[]
    id?: IntFilter<"Ballot"> | number
    anonymousToken?: StringFilter<"Ballot"> | string
    choices?: StringFilter<"Ballot"> | string
    castAt?: DateTimeFilter<"Ballot"> | Date | string
    hash?: StringFilter<"Ballot"> | string
    prevHash?: StringFilter<"Ballot"> | string
  }

  export type BallotOrderByWithRelationInput = {
    id?: SortOrder
    anonymousToken?: SortOrder
    choices?: SortOrder
    castAt?: SortOrder
    hash?: SortOrder
    prevHash?: SortOrder
  }

  export type BallotWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    anonymousToken?: string
    AND?: BallotWhereInput | BallotWhereInput[]
    OR?: BallotWhereInput[]
    NOT?: BallotWhereInput | BallotWhereInput[]
    choices?: StringFilter<"Ballot"> | string
    castAt?: DateTimeFilter<"Ballot"> | Date | string
    hash?: StringFilter<"Ballot"> | string
    prevHash?: StringFilter<"Ballot"> | string
  }, "id" | "anonymousToken">

  export type BallotOrderByWithAggregationInput = {
    id?: SortOrder
    anonymousToken?: SortOrder
    choices?: SortOrder
    castAt?: SortOrder
    hash?: SortOrder
    prevHash?: SortOrder
    _count?: BallotCountOrderByAggregateInput
    _avg?: BallotAvgOrderByAggregateInput
    _max?: BallotMaxOrderByAggregateInput
    _min?: BallotMinOrderByAggregateInput
    _sum?: BallotSumOrderByAggregateInput
  }

  export type BallotScalarWhereWithAggregatesInput = {
    AND?: BallotScalarWhereWithAggregatesInput | BallotScalarWhereWithAggregatesInput[]
    OR?: BallotScalarWhereWithAggregatesInput[]
    NOT?: BallotScalarWhereWithAggregatesInput | BallotScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Ballot"> | number
    anonymousToken?: StringWithAggregatesFilter<"Ballot"> | string
    choices?: StringWithAggregatesFilter<"Ballot"> | string
    castAt?: DateTimeWithAggregatesFilter<"Ballot"> | Date | string
    hash?: StringWithAggregatesFilter<"Ballot"> | string
    prevHash?: StringWithAggregatesFilter<"Ballot"> | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    action?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    details?: StringFilter<"AuditLog"> | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    timestamp?: SortOrder
    details?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    details?: StringFilter<"AuditLog"> | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    timestamp?: SortOrder
    details?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuditLog"> | number
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
    details?: StringWithAggregatesFilter<"AuditLog"> | string
  }

  export type ElectionStateWhereInput = {
    AND?: ElectionStateWhereInput | ElectionStateWhereInput[]
    OR?: ElectionStateWhereInput[]
    NOT?: ElectionStateWhereInput | ElectionStateWhereInput[]
    key?: StringFilter<"ElectionState"> | string
    value?: StringFilter<"ElectionState"> | string
  }

  export type ElectionStateOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type ElectionStateWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: ElectionStateWhereInput | ElectionStateWhereInput[]
    OR?: ElectionStateWhereInput[]
    NOT?: ElectionStateWhereInput | ElectionStateWhereInput[]
    value?: StringFilter<"ElectionState"> | string
  }, "key">

  export type ElectionStateOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    _count?: ElectionStateCountOrderByAggregateInput
    _max?: ElectionStateMaxOrderByAggregateInput
    _min?: ElectionStateMinOrderByAggregateInput
  }

  export type ElectionStateScalarWhereWithAggregatesInput = {
    AND?: ElectionStateScalarWhereWithAggregatesInput | ElectionStateScalarWhereWithAggregatesInput[]
    OR?: ElectionStateScalarWhereWithAggregatesInput[]
    NOT?: ElectionStateScalarWhereWithAggregatesInput | ElectionStateScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"ElectionState"> | string
    value?: StringWithAggregatesFilter<"ElectionState"> | string
  }

  export type DecryptionShareWhereInput = {
    AND?: DecryptionShareWhereInput | DecryptionShareWhereInput[]
    OR?: DecryptionShareWhereInput[]
    NOT?: DecryptionShareWhereInput | DecryptionShareWhereInput[]
    id?: IntFilter<"DecryptionShare"> | number
    adminId?: StringFilter<"DecryptionShare"> | string
    share?: StringFilter<"DecryptionShare"> | string
    submittedAt?: DateTimeFilter<"DecryptionShare"> | Date | string
  }

  export type DecryptionShareOrderByWithRelationInput = {
    id?: SortOrder
    adminId?: SortOrder
    share?: SortOrder
    submittedAt?: SortOrder
  }

  export type DecryptionShareWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    adminId?: string
    AND?: DecryptionShareWhereInput | DecryptionShareWhereInput[]
    OR?: DecryptionShareWhereInput[]
    NOT?: DecryptionShareWhereInput | DecryptionShareWhereInput[]
    share?: StringFilter<"DecryptionShare"> | string
    submittedAt?: DateTimeFilter<"DecryptionShare"> | Date | string
  }, "id" | "adminId">

  export type DecryptionShareOrderByWithAggregationInput = {
    id?: SortOrder
    adminId?: SortOrder
    share?: SortOrder
    submittedAt?: SortOrder
    _count?: DecryptionShareCountOrderByAggregateInput
    _avg?: DecryptionShareAvgOrderByAggregateInput
    _max?: DecryptionShareMaxOrderByAggregateInput
    _min?: DecryptionShareMinOrderByAggregateInput
    _sum?: DecryptionShareSumOrderByAggregateInput
  }

  export type DecryptionShareScalarWhereWithAggregatesInput = {
    AND?: DecryptionShareScalarWhereWithAggregatesInput | DecryptionShareScalarWhereWithAggregatesInput[]
    OR?: DecryptionShareScalarWhereWithAggregatesInput[]
    NOT?: DecryptionShareScalarWhereWithAggregatesInput | DecryptionShareScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DecryptionShare"> | number
    adminId?: StringWithAggregatesFilter<"DecryptionShare"> | string
    share?: StringWithAggregatesFilter<"DecryptionShare"> | string
    submittedAt?: DateTimeWithAggregatesFilter<"DecryptionShare"> | Date | string
  }

  export type ReceiptLookupWhereInput = {
    AND?: ReceiptLookupWhereInput | ReceiptLookupWhereInput[]
    OR?: ReceiptLookupWhereInput[]
    NOT?: ReceiptLookupWhereInput | ReceiptLookupWhereInput[]
    id?: IntFilter<"ReceiptLookup"> | number
    tokenHash?: StringFilter<"ReceiptLookup"> | string
    choices?: StringFilter<"ReceiptLookup"> | string
    createdAt?: DateTimeFilter<"ReceiptLookup"> | Date | string
  }

  export type ReceiptLookupOrderByWithRelationInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    choices?: SortOrder
    createdAt?: SortOrder
  }

  export type ReceiptLookupWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    tokenHash?: string
    AND?: ReceiptLookupWhereInput | ReceiptLookupWhereInput[]
    OR?: ReceiptLookupWhereInput[]
    NOT?: ReceiptLookupWhereInput | ReceiptLookupWhereInput[]
    choices?: StringFilter<"ReceiptLookup"> | string
    createdAt?: DateTimeFilter<"ReceiptLookup"> | Date | string
  }, "id" | "tokenHash">

  export type ReceiptLookupOrderByWithAggregationInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    choices?: SortOrder
    createdAt?: SortOrder
    _count?: ReceiptLookupCountOrderByAggregateInput
    _avg?: ReceiptLookupAvgOrderByAggregateInput
    _max?: ReceiptLookupMaxOrderByAggregateInput
    _min?: ReceiptLookupMinOrderByAggregateInput
    _sum?: ReceiptLookupSumOrderByAggregateInput
  }

  export type ReceiptLookupScalarWhereWithAggregatesInput = {
    AND?: ReceiptLookupScalarWhereWithAggregatesInput | ReceiptLookupScalarWhereWithAggregatesInput[]
    OR?: ReceiptLookupScalarWhereWithAggregatesInput[]
    NOT?: ReceiptLookupScalarWhereWithAggregatesInput | ReceiptLookupScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ReceiptLookup"> | number
    tokenHash?: StringWithAggregatesFilter<"ReceiptLookup"> | string
    choices?: StringWithAggregatesFilter<"ReceiptLookup"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ReceiptLookup"> | Date | string
  }

  export type VoterCreateInput = {
    studentId: string
    hasVoted?: boolean
    votedAt?: Date | string | null
    department: string
    email?: string
  }

  export type VoterUncheckedCreateInput = {
    studentId: string
    hasVoted?: boolean
    votedAt?: Date | string | null
    department: string
    email?: string
  }

  export type VoterUpdateInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    hasVoted?: BoolFieldUpdateOperationsInput | boolean
    votedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type VoterUncheckedUpdateInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    hasVoted?: BoolFieldUpdateOperationsInput | boolean
    votedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type VoterCreateManyInput = {
    studentId: string
    hasVoted?: boolean
    votedAt?: Date | string | null
    department: string
    email?: string
  }

  export type VoterUpdateManyMutationInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    hasVoted?: BoolFieldUpdateOperationsInput | boolean
    votedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type VoterUncheckedUpdateManyInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    hasVoted?: BoolFieldUpdateOperationsInput | boolean
    votedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    department?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type BallotCreateInput = {
    anonymousToken: string
    choices: string
    castAt?: Date | string
    hash: string
    prevHash: string
  }

  export type BallotUncheckedCreateInput = {
    id?: number
    anonymousToken: string
    choices: string
    castAt?: Date | string
    hash: string
    prevHash: string
  }

  export type BallotUpdateInput = {
    anonymousToken?: StringFieldUpdateOperationsInput | string
    choices?: StringFieldUpdateOperationsInput | string
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    prevHash?: StringFieldUpdateOperationsInput | string
  }

  export type BallotUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    anonymousToken?: StringFieldUpdateOperationsInput | string
    choices?: StringFieldUpdateOperationsInput | string
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    prevHash?: StringFieldUpdateOperationsInput | string
  }

  export type BallotCreateManyInput = {
    id?: number
    anonymousToken: string
    choices: string
    castAt?: Date | string
    hash: string
    prevHash: string
  }

  export type BallotUpdateManyMutationInput = {
    anonymousToken?: StringFieldUpdateOperationsInput | string
    choices?: StringFieldUpdateOperationsInput | string
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    prevHash?: StringFieldUpdateOperationsInput | string
  }

  export type BallotUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    anonymousToken?: StringFieldUpdateOperationsInput | string
    choices?: StringFieldUpdateOperationsInput | string
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hash?: StringFieldUpdateOperationsInput | string
    prevHash?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogCreateInput = {
    action: string
    timestamp?: Date | string
    details: string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: number
    action: string
    timestamp?: Date | string
    details: string
  }

  export type AuditLogUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogCreateManyInput = {
    id?: number
    action: string
    timestamp?: Date | string
    details: string
  }

  export type AuditLogUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    details?: StringFieldUpdateOperationsInput | string
  }

  export type ElectionStateCreateInput = {
    key: string
    value: string
  }

  export type ElectionStateUncheckedCreateInput = {
    key: string
    value: string
  }

  export type ElectionStateUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ElectionStateUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ElectionStateCreateManyInput = {
    key: string
    value: string
  }

  export type ElectionStateUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ElectionStateUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type DecryptionShareCreateInput = {
    adminId: string
    share: string
    submittedAt?: Date | string
  }

  export type DecryptionShareUncheckedCreateInput = {
    id?: number
    adminId: string
    share: string
    submittedAt?: Date | string
  }

  export type DecryptionShareUpdateInput = {
    adminId?: StringFieldUpdateOperationsInput | string
    share?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DecryptionShareUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    adminId?: StringFieldUpdateOperationsInput | string
    share?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DecryptionShareCreateManyInput = {
    id?: number
    adminId: string
    share: string
    submittedAt?: Date | string
  }

  export type DecryptionShareUpdateManyMutationInput = {
    adminId?: StringFieldUpdateOperationsInput | string
    share?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DecryptionShareUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    adminId?: StringFieldUpdateOperationsInput | string
    share?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptLookupCreateInput = {
    tokenHash: string
    choices: string
    createdAt?: Date | string
  }

  export type ReceiptLookupUncheckedCreateInput = {
    id?: number
    tokenHash: string
    choices: string
    createdAt?: Date | string
  }

  export type ReceiptLookupUpdateInput = {
    tokenHash?: StringFieldUpdateOperationsInput | string
    choices?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptLookupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tokenHash?: StringFieldUpdateOperationsInput | string
    choices?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptLookupCreateManyInput = {
    id?: number
    tokenHash: string
    choices: string
    createdAt?: Date | string
  }

  export type ReceiptLookupUpdateManyMutationInput = {
    tokenHash?: StringFieldUpdateOperationsInput | string
    choices?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptLookupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tokenHash?: StringFieldUpdateOperationsInput | string
    choices?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VoterCountOrderByAggregateInput = {
    studentId?: SortOrder
    hasVoted?: SortOrder
    votedAt?: SortOrder
    department?: SortOrder
    email?: SortOrder
  }

  export type VoterMaxOrderByAggregateInput = {
    studentId?: SortOrder
    hasVoted?: SortOrder
    votedAt?: SortOrder
    department?: SortOrder
    email?: SortOrder
  }

  export type VoterMinOrderByAggregateInput = {
    studentId?: SortOrder
    hasVoted?: SortOrder
    votedAt?: SortOrder
    department?: SortOrder
    email?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BallotCountOrderByAggregateInput = {
    id?: SortOrder
    anonymousToken?: SortOrder
    choices?: SortOrder
    castAt?: SortOrder
    hash?: SortOrder
    prevHash?: SortOrder
  }

  export type BallotAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BallotMaxOrderByAggregateInput = {
    id?: SortOrder
    anonymousToken?: SortOrder
    choices?: SortOrder
    castAt?: SortOrder
    hash?: SortOrder
    prevHash?: SortOrder
  }

  export type BallotMinOrderByAggregateInput = {
    id?: SortOrder
    anonymousToken?: SortOrder
    choices?: SortOrder
    castAt?: SortOrder
    hash?: SortOrder
    prevHash?: SortOrder
  }

  export type BallotSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    timestamp?: SortOrder
    details?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    timestamp?: SortOrder
    details?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    timestamp?: SortOrder
    details?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ElectionStateCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type ElectionStateMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type ElectionStateMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type DecryptionShareCountOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    share?: SortOrder
    submittedAt?: SortOrder
  }

  export type DecryptionShareAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DecryptionShareMaxOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    share?: SortOrder
    submittedAt?: SortOrder
  }

  export type DecryptionShareMinOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    share?: SortOrder
    submittedAt?: SortOrder
  }

  export type DecryptionShareSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ReceiptLookupCountOrderByAggregateInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    choices?: SortOrder
    createdAt?: SortOrder
  }

  export type ReceiptLookupAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ReceiptLookupMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    choices?: SortOrder
    createdAt?: SortOrder
  }

  export type ReceiptLookupMinOrderByAggregateInput = {
    id?: SortOrder
    tokenHash?: SortOrder
    choices?: SortOrder
    createdAt?: SortOrder
  }

  export type ReceiptLookupSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use VoterDefaultArgs instead
     */
    export type VoterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VoterDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BallotDefaultArgs instead
     */
    export type BallotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BallotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ElectionStateDefaultArgs instead
     */
    export type ElectionStateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ElectionStateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DecryptionShareDefaultArgs instead
     */
    export type DecryptionShareArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DecryptionShareDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReceiptLookupDefaultArgs instead
     */
    export type ReceiptLookupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReceiptLookupDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}