
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Mesero
 * 
 */
export type Mesero = $Result.DefaultSelection<Prisma.$MeseroPayload>
/**
 * Model Mesa
 * 
 */
export type Mesa = $Result.DefaultSelection<Prisma.$MesaPayload>
/**
 * Model Producto
 * 
 */
export type Producto = $Result.DefaultSelection<Prisma.$ProductoPayload>
/**
 * Model Aditamento
 * 
 */
export type Aditamento = $Result.DefaultSelection<Prisma.$AditamentoPayload>
/**
 * Model ProductoAditamentos
 * 
 */
export type ProductoAditamentos = $Result.DefaultSelection<Prisma.$ProductoAditamentosPayload>
/**
 * Model Comandas
 * 
 */
export type Comandas = $Result.DefaultSelection<Prisma.$ComandasPayload>
/**
 * Model DetalleComanda
 * 
 */
export type DetalleComanda = $Result.DefaultSelection<Prisma.$DetalleComandaPayload>
/**
 * Model ComandaAditamentos
 * 
 */
export type ComandaAditamentos = $Result.DefaultSelection<Prisma.$ComandaAditamentosPayload>
/**
 * Model ProductoImagen
 * 
 */
export type ProductoImagen = $Result.DefaultSelection<Prisma.$ProductoImagenPayload>
/**
 * Model HistorialAnalitico
 * 
 */
export type HistorialAnalitico = $Result.DefaultSelection<Prisma.$HistorialAnaliticoPayload>
/**
 * Model Categoria
 * 
 */
export type Categoria = $Result.DefaultSelection<Prisma.$CategoriaPayload>
/**
 * Model SubCategoria
 * 
 */
export type SubCategoria = $Result.DefaultSelection<Prisma.$SubCategoriaPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mesero`: Exposes CRUD operations for the **Mesero** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meseros
    * const meseros = await prisma.mesero.findMany()
    * ```
    */
  get mesero(): Prisma.MeseroDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mesa`: Exposes CRUD operations for the **Mesa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mesas
    * const mesas = await prisma.mesa.findMany()
    * ```
    */
  get mesa(): Prisma.MesaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.producto`: Exposes CRUD operations for the **Producto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productos
    * const productos = await prisma.producto.findMany()
    * ```
    */
  get producto(): Prisma.ProductoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aditamento`: Exposes CRUD operations for the **Aditamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Aditamentos
    * const aditamentos = await prisma.aditamento.findMany()
    * ```
    */
  get aditamento(): Prisma.AditamentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productoAditamentos`: Exposes CRUD operations for the **ProductoAditamentos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductoAditamentos
    * const productoAditamentos = await prisma.productoAditamentos.findMany()
    * ```
    */
  get productoAditamentos(): Prisma.ProductoAditamentosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comandas`: Exposes CRUD operations for the **Comandas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comandas
    * const comandas = await prisma.comandas.findMany()
    * ```
    */
  get comandas(): Prisma.ComandasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.detalleComanda`: Exposes CRUD operations for the **DetalleComanda** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DetalleComandas
    * const detalleComandas = await prisma.detalleComanda.findMany()
    * ```
    */
  get detalleComanda(): Prisma.DetalleComandaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comandaAditamentos`: Exposes CRUD operations for the **ComandaAditamentos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComandaAditamentos
    * const comandaAditamentos = await prisma.comandaAditamentos.findMany()
    * ```
    */
  get comandaAditamentos(): Prisma.ComandaAditamentosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productoImagen`: Exposes CRUD operations for the **ProductoImagen** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductoImagens
    * const productoImagens = await prisma.productoImagen.findMany()
    * ```
    */
  get productoImagen(): Prisma.ProductoImagenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.historialAnalitico`: Exposes CRUD operations for the **HistorialAnalitico** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HistorialAnaliticos
    * const historialAnaliticos = await prisma.historialAnalitico.findMany()
    * ```
    */
  get historialAnalitico(): Prisma.HistorialAnaliticoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoria`: Exposes CRUD operations for the **Categoria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categorias
    * const categorias = await prisma.categoria.findMany()
    * ```
    */
  get categoria(): Prisma.CategoriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subCategoria`: Exposes CRUD operations for the **SubCategoria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubCategorias
    * const subCategorias = await prisma.subCategoria.findMany()
    * ```
    */
  get subCategoria(): Prisma.SubCategoriaDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Usuario: 'Usuario',
    Mesero: 'Mesero',
    Mesa: 'Mesa',
    Producto: 'Producto',
    Aditamento: 'Aditamento',
    ProductoAditamentos: 'ProductoAditamentos',
    Comandas: 'Comandas',
    DetalleComanda: 'DetalleComanda',
    ComandaAditamentos: 'ComandaAditamentos',
    ProductoImagen: 'ProductoImagen',
    HistorialAnalitico: 'HistorialAnalitico',
    Categoria: 'Categoria',
    SubCategoria: 'SubCategoria'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "mesero" | "mesa" | "producto" | "aditamento" | "productoAditamentos" | "comandas" | "detalleComanda" | "comandaAditamentos" | "productoImagen" | "historialAnalitico" | "categoria" | "subCategoria"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Mesero: {
        payload: Prisma.$MeseroPayload<ExtArgs>
        fields: Prisma.MeseroFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MeseroFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeseroPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MeseroFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeseroPayload>
          }
          findFirst: {
            args: Prisma.MeseroFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeseroPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MeseroFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeseroPayload>
          }
          findMany: {
            args: Prisma.MeseroFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeseroPayload>[]
          }
          create: {
            args: Prisma.MeseroCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeseroPayload>
          }
          createMany: {
            args: Prisma.MeseroCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MeseroCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeseroPayload>[]
          }
          delete: {
            args: Prisma.MeseroDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeseroPayload>
          }
          update: {
            args: Prisma.MeseroUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeseroPayload>
          }
          deleteMany: {
            args: Prisma.MeseroDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MeseroUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MeseroUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeseroPayload>[]
          }
          upsert: {
            args: Prisma.MeseroUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MeseroPayload>
          }
          aggregate: {
            args: Prisma.MeseroAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMesero>
          }
          groupBy: {
            args: Prisma.MeseroGroupByArgs<ExtArgs>
            result: $Utils.Optional<MeseroGroupByOutputType>[]
          }
          count: {
            args: Prisma.MeseroCountArgs<ExtArgs>
            result: $Utils.Optional<MeseroCountAggregateOutputType> | number
          }
        }
      }
      Mesa: {
        payload: Prisma.$MesaPayload<ExtArgs>
        fields: Prisma.MesaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MesaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MesaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          findFirst: {
            args: Prisma.MesaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MesaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          findMany: {
            args: Prisma.MesaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>[]
          }
          create: {
            args: Prisma.MesaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          createMany: {
            args: Prisma.MesaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MesaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>[]
          }
          delete: {
            args: Prisma.MesaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          update: {
            args: Prisma.MesaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          deleteMany: {
            args: Prisma.MesaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MesaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MesaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>[]
          }
          upsert: {
            args: Prisma.MesaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesaPayload>
          }
          aggregate: {
            args: Prisma.MesaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMesa>
          }
          groupBy: {
            args: Prisma.MesaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MesaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MesaCountArgs<ExtArgs>
            result: $Utils.Optional<MesaCountAggregateOutputType> | number
          }
        }
      }
      Producto: {
        payload: Prisma.$ProductoPayload<ExtArgs>
        fields: Prisma.ProductoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          findFirst: {
            args: Prisma.ProductoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          findMany: {
            args: Prisma.ProductoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          create: {
            args: Prisma.ProductoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          createMany: {
            args: Prisma.ProductoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          delete: {
            args: Prisma.ProductoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          update: {
            args: Prisma.ProductoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          deleteMany: {
            args: Prisma.ProductoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          upsert: {
            args: Prisma.ProductoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          aggregate: {
            args: Prisma.ProductoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProducto>
          }
          groupBy: {
            args: Prisma.ProductoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductoCountArgs<ExtArgs>
            result: $Utils.Optional<ProductoCountAggregateOutputType> | number
          }
        }
      }
      Aditamento: {
        payload: Prisma.$AditamentoPayload<ExtArgs>
        fields: Prisma.AditamentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AditamentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AditamentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AditamentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AditamentoPayload>
          }
          findFirst: {
            args: Prisma.AditamentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AditamentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AditamentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AditamentoPayload>
          }
          findMany: {
            args: Prisma.AditamentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AditamentoPayload>[]
          }
          create: {
            args: Prisma.AditamentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AditamentoPayload>
          }
          createMany: {
            args: Prisma.AditamentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AditamentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AditamentoPayload>[]
          }
          delete: {
            args: Prisma.AditamentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AditamentoPayload>
          }
          update: {
            args: Prisma.AditamentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AditamentoPayload>
          }
          deleteMany: {
            args: Prisma.AditamentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AditamentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AditamentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AditamentoPayload>[]
          }
          upsert: {
            args: Prisma.AditamentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AditamentoPayload>
          }
          aggregate: {
            args: Prisma.AditamentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAditamento>
          }
          groupBy: {
            args: Prisma.AditamentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<AditamentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.AditamentoCountArgs<ExtArgs>
            result: $Utils.Optional<AditamentoCountAggregateOutputType> | number
          }
        }
      }
      ProductoAditamentos: {
        payload: Prisma.$ProductoAditamentosPayload<ExtArgs>
        fields: Prisma.ProductoAditamentosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductoAditamentosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoAditamentosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductoAditamentosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoAditamentosPayload>
          }
          findFirst: {
            args: Prisma.ProductoAditamentosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoAditamentosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductoAditamentosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoAditamentosPayload>
          }
          findMany: {
            args: Prisma.ProductoAditamentosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoAditamentosPayload>[]
          }
          create: {
            args: Prisma.ProductoAditamentosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoAditamentosPayload>
          }
          createMany: {
            args: Prisma.ProductoAditamentosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductoAditamentosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoAditamentosPayload>[]
          }
          delete: {
            args: Prisma.ProductoAditamentosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoAditamentosPayload>
          }
          update: {
            args: Prisma.ProductoAditamentosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoAditamentosPayload>
          }
          deleteMany: {
            args: Prisma.ProductoAditamentosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductoAditamentosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductoAditamentosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoAditamentosPayload>[]
          }
          upsert: {
            args: Prisma.ProductoAditamentosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoAditamentosPayload>
          }
          aggregate: {
            args: Prisma.ProductoAditamentosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductoAditamentos>
          }
          groupBy: {
            args: Prisma.ProductoAditamentosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductoAditamentosGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductoAditamentosCountArgs<ExtArgs>
            result: $Utils.Optional<ProductoAditamentosCountAggregateOutputType> | number
          }
        }
      }
      Comandas: {
        payload: Prisma.$ComandasPayload<ExtArgs>
        fields: Prisma.ComandasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComandasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComandasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandasPayload>
          }
          findFirst: {
            args: Prisma.ComandasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComandasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandasPayload>
          }
          findMany: {
            args: Prisma.ComandasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandasPayload>[]
          }
          create: {
            args: Prisma.ComandasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandasPayload>
          }
          createMany: {
            args: Prisma.ComandasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComandasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandasPayload>[]
          }
          delete: {
            args: Prisma.ComandasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandasPayload>
          }
          update: {
            args: Prisma.ComandasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandasPayload>
          }
          deleteMany: {
            args: Prisma.ComandasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComandasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComandasUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandasPayload>[]
          }
          upsert: {
            args: Prisma.ComandasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandasPayload>
          }
          aggregate: {
            args: Prisma.ComandasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComandas>
          }
          groupBy: {
            args: Prisma.ComandasGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComandasGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComandasCountArgs<ExtArgs>
            result: $Utils.Optional<ComandasCountAggregateOutputType> | number
          }
        }
      }
      DetalleComanda: {
        payload: Prisma.$DetalleComandaPayload<ExtArgs>
        fields: Prisma.DetalleComandaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DetalleComandaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleComandaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DetalleComandaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleComandaPayload>
          }
          findFirst: {
            args: Prisma.DetalleComandaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleComandaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DetalleComandaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleComandaPayload>
          }
          findMany: {
            args: Prisma.DetalleComandaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleComandaPayload>[]
          }
          create: {
            args: Prisma.DetalleComandaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleComandaPayload>
          }
          createMany: {
            args: Prisma.DetalleComandaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DetalleComandaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleComandaPayload>[]
          }
          delete: {
            args: Prisma.DetalleComandaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleComandaPayload>
          }
          update: {
            args: Prisma.DetalleComandaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleComandaPayload>
          }
          deleteMany: {
            args: Prisma.DetalleComandaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DetalleComandaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DetalleComandaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleComandaPayload>[]
          }
          upsert: {
            args: Prisma.DetalleComandaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DetalleComandaPayload>
          }
          aggregate: {
            args: Prisma.DetalleComandaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDetalleComanda>
          }
          groupBy: {
            args: Prisma.DetalleComandaGroupByArgs<ExtArgs>
            result: $Utils.Optional<DetalleComandaGroupByOutputType>[]
          }
          count: {
            args: Prisma.DetalleComandaCountArgs<ExtArgs>
            result: $Utils.Optional<DetalleComandaCountAggregateOutputType> | number
          }
        }
      }
      ComandaAditamentos: {
        payload: Prisma.$ComandaAditamentosPayload<ExtArgs>
        fields: Prisma.ComandaAditamentosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComandaAditamentosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaAditamentosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComandaAditamentosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaAditamentosPayload>
          }
          findFirst: {
            args: Prisma.ComandaAditamentosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaAditamentosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComandaAditamentosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaAditamentosPayload>
          }
          findMany: {
            args: Prisma.ComandaAditamentosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaAditamentosPayload>[]
          }
          create: {
            args: Prisma.ComandaAditamentosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaAditamentosPayload>
          }
          createMany: {
            args: Prisma.ComandaAditamentosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComandaAditamentosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaAditamentosPayload>[]
          }
          delete: {
            args: Prisma.ComandaAditamentosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaAditamentosPayload>
          }
          update: {
            args: Prisma.ComandaAditamentosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaAditamentosPayload>
          }
          deleteMany: {
            args: Prisma.ComandaAditamentosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComandaAditamentosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComandaAditamentosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaAditamentosPayload>[]
          }
          upsert: {
            args: Prisma.ComandaAditamentosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComandaAditamentosPayload>
          }
          aggregate: {
            args: Prisma.ComandaAditamentosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComandaAditamentos>
          }
          groupBy: {
            args: Prisma.ComandaAditamentosGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComandaAditamentosGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComandaAditamentosCountArgs<ExtArgs>
            result: $Utils.Optional<ComandaAditamentosCountAggregateOutputType> | number
          }
        }
      }
      ProductoImagen: {
        payload: Prisma.$ProductoImagenPayload<ExtArgs>
        fields: Prisma.ProductoImagenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductoImagenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoImagenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductoImagenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoImagenPayload>
          }
          findFirst: {
            args: Prisma.ProductoImagenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoImagenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductoImagenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoImagenPayload>
          }
          findMany: {
            args: Prisma.ProductoImagenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoImagenPayload>[]
          }
          create: {
            args: Prisma.ProductoImagenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoImagenPayload>
          }
          createMany: {
            args: Prisma.ProductoImagenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductoImagenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoImagenPayload>[]
          }
          delete: {
            args: Prisma.ProductoImagenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoImagenPayload>
          }
          update: {
            args: Prisma.ProductoImagenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoImagenPayload>
          }
          deleteMany: {
            args: Prisma.ProductoImagenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductoImagenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductoImagenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoImagenPayload>[]
          }
          upsert: {
            args: Prisma.ProductoImagenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoImagenPayload>
          }
          aggregate: {
            args: Prisma.ProductoImagenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductoImagen>
          }
          groupBy: {
            args: Prisma.ProductoImagenGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductoImagenGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductoImagenCountArgs<ExtArgs>
            result: $Utils.Optional<ProductoImagenCountAggregateOutputType> | number
          }
        }
      }
      HistorialAnalitico: {
        payload: Prisma.$HistorialAnaliticoPayload<ExtArgs>
        fields: Prisma.HistorialAnaliticoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HistorialAnaliticoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialAnaliticoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HistorialAnaliticoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialAnaliticoPayload>
          }
          findFirst: {
            args: Prisma.HistorialAnaliticoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialAnaliticoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HistorialAnaliticoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialAnaliticoPayload>
          }
          findMany: {
            args: Prisma.HistorialAnaliticoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialAnaliticoPayload>[]
          }
          create: {
            args: Prisma.HistorialAnaliticoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialAnaliticoPayload>
          }
          createMany: {
            args: Prisma.HistorialAnaliticoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HistorialAnaliticoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialAnaliticoPayload>[]
          }
          delete: {
            args: Prisma.HistorialAnaliticoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialAnaliticoPayload>
          }
          update: {
            args: Prisma.HistorialAnaliticoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialAnaliticoPayload>
          }
          deleteMany: {
            args: Prisma.HistorialAnaliticoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HistorialAnaliticoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HistorialAnaliticoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialAnaliticoPayload>[]
          }
          upsert: {
            args: Prisma.HistorialAnaliticoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistorialAnaliticoPayload>
          }
          aggregate: {
            args: Prisma.HistorialAnaliticoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHistorialAnalitico>
          }
          groupBy: {
            args: Prisma.HistorialAnaliticoGroupByArgs<ExtArgs>
            result: $Utils.Optional<HistorialAnaliticoGroupByOutputType>[]
          }
          count: {
            args: Prisma.HistorialAnaliticoCountArgs<ExtArgs>
            result: $Utils.Optional<HistorialAnaliticoCountAggregateOutputType> | number
          }
        }
      }
      Categoria: {
        payload: Prisma.$CategoriaPayload<ExtArgs>
        fields: Prisma.CategoriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findFirst: {
            args: Prisma.CategoriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findMany: {
            args: Prisma.CategoriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          create: {
            args: Prisma.CategoriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          createMany: {
            args: Prisma.CategoriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoriaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          delete: {
            args: Prisma.CategoriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          update: {
            args: Prisma.CategoriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          deleteMany: {
            args: Prisma.CategoriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoriaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          upsert: {
            args: Prisma.CategoriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          aggregate: {
            args: Prisma.CategoriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoria>
          }
          groupBy: {
            args: Prisma.CategoriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoriaCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriaCountAggregateOutputType> | number
          }
        }
      }
      SubCategoria: {
        payload: Prisma.$SubCategoriaPayload<ExtArgs>
        fields: Prisma.SubCategoriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubCategoriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubCategoriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubCategoriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubCategoriaPayload>
          }
          findFirst: {
            args: Prisma.SubCategoriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubCategoriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubCategoriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubCategoriaPayload>
          }
          findMany: {
            args: Prisma.SubCategoriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubCategoriaPayload>[]
          }
          create: {
            args: Prisma.SubCategoriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubCategoriaPayload>
          }
          createMany: {
            args: Prisma.SubCategoriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubCategoriaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubCategoriaPayload>[]
          }
          delete: {
            args: Prisma.SubCategoriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubCategoriaPayload>
          }
          update: {
            args: Prisma.SubCategoriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubCategoriaPayload>
          }
          deleteMany: {
            args: Prisma.SubCategoriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubCategoriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubCategoriaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubCategoriaPayload>[]
          }
          upsert: {
            args: Prisma.SubCategoriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubCategoriaPayload>
          }
          aggregate: {
            args: Prisma.SubCategoriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubCategoria>
          }
          groupBy: {
            args: Prisma.SubCategoriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubCategoriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubCategoriaCountArgs<ExtArgs>
            result: $Utils.Optional<SubCategoriaCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    mesero?: MeseroOmit
    mesa?: MesaOmit
    producto?: ProductoOmit
    aditamento?: AditamentoOmit
    productoAditamentos?: ProductoAditamentosOmit
    comandas?: ComandasOmit
    detalleComanda?: DetalleComandaOmit
    comandaAditamentos?: ComandaAditamentosOmit
    productoImagen?: ProductoImagenOmit
    historialAnalitico?: HistorialAnaliticoOmit
    categoria?: CategoriaOmit
    subCategoria?: SubCategoriaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'updateManyAndReturn'
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
   * Count Type MeseroCountOutputType
   */

  export type MeseroCountOutputType = {
    comandas: number
  }

  export type MeseroCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comandas?: boolean | MeseroCountOutputTypeCountComandasArgs
  }

  // Custom InputTypes
  /**
   * MeseroCountOutputType without action
   */
  export type MeseroCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MeseroCountOutputType
     */
    select?: MeseroCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MeseroCountOutputType without action
   */
  export type MeseroCountOutputTypeCountComandasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComandasWhereInput
  }


  /**
   * Count Type MesaCountOutputType
   */

  export type MesaCountOutputType = {
    comandas: number
  }

  export type MesaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comandas?: boolean | MesaCountOutputTypeCountComandasArgs
  }

  // Custom InputTypes
  /**
   * MesaCountOutputType without action
   */
  export type MesaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MesaCountOutputType
     */
    select?: MesaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MesaCountOutputType without action
   */
  export type MesaCountOutputTypeCountComandasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComandasWhereInput
  }


  /**
   * Count Type ProductoCountOutputType
   */

  export type ProductoCountOutputType = {
    detalles: number
    historial: number
    aditamentos: number
    imagen: number
  }

  export type ProductoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detalles?: boolean | ProductoCountOutputTypeCountDetallesArgs
    historial?: boolean | ProductoCountOutputTypeCountHistorialArgs
    aditamentos?: boolean | ProductoCountOutputTypeCountAditamentosArgs
    imagen?: boolean | ProductoCountOutputTypeCountImagenArgs
  }

  // Custom InputTypes
  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoCountOutputType
     */
    select?: ProductoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountDetallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DetalleComandaWhereInput
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountHistorialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistorialAnaliticoWhereInput
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountAditamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoAditamentosWhereInput
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountImagenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoImagenWhereInput
  }


  /**
   * Count Type AditamentoCountOutputType
   */

  export type AditamentoCountOutputType = {
    comandas: number
    productos: number
  }

  export type AditamentoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comandas?: boolean | AditamentoCountOutputTypeCountComandasArgs
    productos?: boolean | AditamentoCountOutputTypeCountProductosArgs
  }

  // Custom InputTypes
  /**
   * AditamentoCountOutputType without action
   */
  export type AditamentoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AditamentoCountOutputType
     */
    select?: AditamentoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AditamentoCountOutputType without action
   */
  export type AditamentoCountOutputTypeCountComandasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComandaAditamentosWhereInput
  }

  /**
   * AditamentoCountOutputType without action
   */
  export type AditamentoCountOutputTypeCountProductosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoAditamentosWhereInput
  }


  /**
   * Count Type ComandasCountOutputType
   */

  export type ComandasCountOutputType = {
    detalles: number
  }

  export type ComandasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detalles?: boolean | ComandasCountOutputTypeCountDetallesArgs
  }

  // Custom InputTypes
  /**
   * ComandasCountOutputType without action
   */
  export type ComandasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandasCountOutputType
     */
    select?: ComandasCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ComandasCountOutputType without action
   */
  export type ComandasCountOutputTypeCountDetallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DetalleComandaWhereInput
  }


  /**
   * Count Type DetalleComandaCountOutputType
   */

  export type DetalleComandaCountOutputType = {
    aditamentos: number
  }

  export type DetalleComandaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aditamentos?: boolean | DetalleComandaCountOutputTypeCountAditamentosArgs
  }

  // Custom InputTypes
  /**
   * DetalleComandaCountOutputType without action
   */
  export type DetalleComandaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComandaCountOutputType
     */
    select?: DetalleComandaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DetalleComandaCountOutputType without action
   */
  export type DetalleComandaCountOutputTypeCountAditamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComandaAditamentosWhereInput
  }


  /**
   * Count Type CategoriaCountOutputType
   */

  export type CategoriaCountOutputType = {
    historial: number
    productos: number
    subcategorias: number
  }

  export type CategoriaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    historial?: boolean | CategoriaCountOutputTypeCountHistorialArgs
    productos?: boolean | CategoriaCountOutputTypeCountProductosArgs
    subcategorias?: boolean | CategoriaCountOutputTypeCountSubcategoriasArgs
  }

  // Custom InputTypes
  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriaCountOutputType
     */
    select?: CategoriaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeCountHistorialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistorialAnaliticoWhereInput
  }

  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeCountProductosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
  }

  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeCountSubcategoriasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubCategoriaWhereInput
  }


  /**
   * Count Type SubCategoriaCountOutputType
   */

  export type SubCategoriaCountOutputType = {
    historial_analitico: number
    productos: number
  }

  export type SubCategoriaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    historial_analitico?: boolean | SubCategoriaCountOutputTypeCountHistorial_analiticoArgs
    productos?: boolean | SubCategoriaCountOutputTypeCountProductosArgs
  }

  // Custom InputTypes
  /**
   * SubCategoriaCountOutputType without action
   */
  export type SubCategoriaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoriaCountOutputType
     */
    select?: SubCategoriaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubCategoriaCountOutputType without action
   */
  export type SubCategoriaCountOutputTypeCountHistorial_analiticoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistorialAnaliticoWhereInput
  }

  /**
   * SubCategoriaCountOutputType without action
   */
  export type SubCategoriaCountOutputTypeCountProductosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    usuario: string | null
    email: string | null
    password: string | null
    rol: string | null
    fecha_creacion: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    usuario: string | null
    email: string | null
    password: string | null
    rol: string | null
    fecha_creacion: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    usuario: number
    email: number
    password: number
    rol: number
    fecha_creacion: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    usuario?: true
    email?: true
    password?: true
    rol?: true
    fecha_creacion?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    usuario?: true
    email?: true
    password?: true
    rol?: true
    fecha_creacion?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    usuario?: true
    email?: true
    password?: true
    rol?: true
    fecha_creacion?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    usuario: string
    email: string
    password: string
    rol: string
    fecha_creacion: Date | null
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    usuario?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    fecha_creacion?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "usuario" | "email" | "password" | "rol" | "fecha_creacion", ExtArgs["result"]["usuario"]>

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      usuario: string
      email: string
      password: string
      rol: string
      fecha_creacion: Date | null
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
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
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly usuario: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly password: FieldRef<"Usuario", 'String'>
    readonly rol: FieldRef<"Usuario", 'String'>
    readonly fecha_creacion: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
  }


  /**
   * Model Mesero
   */

  export type AggregateMesero = {
    _count: MeseroCountAggregateOutputType | null
    _avg: MeseroAvgAggregateOutputType | null
    _sum: MeseroSumAggregateOutputType | null
    _min: MeseroMinAggregateOutputType | null
    _max: MeseroMaxAggregateOutputType | null
  }

  export type MeseroAvgAggregateOutputType = {
    id_mesero: number | null
  }

  export type MeseroSumAggregateOutputType = {
    id_mesero: number | null
  }

  export type MeseroMinAggregateOutputType = {
    id_mesero: number | null
    nombre: string | null
    turno: string | null
  }

  export type MeseroMaxAggregateOutputType = {
    id_mesero: number | null
    nombre: string | null
    turno: string | null
  }

  export type MeseroCountAggregateOutputType = {
    id_mesero: number
    nombre: number
    turno: number
    _all: number
  }


  export type MeseroAvgAggregateInputType = {
    id_mesero?: true
  }

  export type MeseroSumAggregateInputType = {
    id_mesero?: true
  }

  export type MeseroMinAggregateInputType = {
    id_mesero?: true
    nombre?: true
    turno?: true
  }

  export type MeseroMaxAggregateInputType = {
    id_mesero?: true
    nombre?: true
    turno?: true
  }

  export type MeseroCountAggregateInputType = {
    id_mesero?: true
    nombre?: true
    turno?: true
    _all?: true
  }

  export type MeseroAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mesero to aggregate.
     */
    where?: MeseroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meseros to fetch.
     */
    orderBy?: MeseroOrderByWithRelationInput | MeseroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MeseroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meseros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meseros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Meseros
    **/
    _count?: true | MeseroCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MeseroAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MeseroSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MeseroMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MeseroMaxAggregateInputType
  }

  export type GetMeseroAggregateType<T extends MeseroAggregateArgs> = {
        [P in keyof T & keyof AggregateMesero]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMesero[P]>
      : GetScalarType<T[P], AggregateMesero[P]>
  }




  export type MeseroGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MeseroWhereInput
    orderBy?: MeseroOrderByWithAggregationInput | MeseroOrderByWithAggregationInput[]
    by: MeseroScalarFieldEnum[] | MeseroScalarFieldEnum
    having?: MeseroScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MeseroCountAggregateInputType | true
    _avg?: MeseroAvgAggregateInputType
    _sum?: MeseroSumAggregateInputType
    _min?: MeseroMinAggregateInputType
    _max?: MeseroMaxAggregateInputType
  }

  export type MeseroGroupByOutputType = {
    id_mesero: number
    nombre: string
    turno: string
    _count: MeseroCountAggregateOutputType | null
    _avg: MeseroAvgAggregateOutputType | null
    _sum: MeseroSumAggregateOutputType | null
    _min: MeseroMinAggregateOutputType | null
    _max: MeseroMaxAggregateOutputType | null
  }

  type GetMeseroGroupByPayload<T extends MeseroGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MeseroGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MeseroGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeseroGroupByOutputType[P]>
            : GetScalarType<T[P], MeseroGroupByOutputType[P]>
        }
      >
    >


  export type MeseroSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_mesero?: boolean
    nombre?: boolean
    turno?: boolean
    comandas?: boolean | Mesero$comandasArgs<ExtArgs>
    _count?: boolean | MeseroCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mesero"]>

  export type MeseroSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_mesero?: boolean
    nombre?: boolean
    turno?: boolean
  }, ExtArgs["result"]["mesero"]>

  export type MeseroSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_mesero?: boolean
    nombre?: boolean
    turno?: boolean
  }, ExtArgs["result"]["mesero"]>

  export type MeseroSelectScalar = {
    id_mesero?: boolean
    nombre?: boolean
    turno?: boolean
  }

  export type MeseroOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_mesero" | "nombre" | "turno", ExtArgs["result"]["mesero"]>
  export type MeseroInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comandas?: boolean | Mesero$comandasArgs<ExtArgs>
    _count?: boolean | MeseroCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MeseroIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MeseroIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MeseroPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mesero"
    objects: {
      comandas: Prisma.$ComandasPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_mesero: number
      nombre: string
      turno: string
    }, ExtArgs["result"]["mesero"]>
    composites: {}
  }

  type MeseroGetPayload<S extends boolean | null | undefined | MeseroDefaultArgs> = $Result.GetResult<Prisma.$MeseroPayload, S>

  type MeseroCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MeseroFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MeseroCountAggregateInputType | true
    }

  export interface MeseroDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mesero'], meta: { name: 'Mesero' } }
    /**
     * Find zero or one Mesero that matches the filter.
     * @param {MeseroFindUniqueArgs} args - Arguments to find a Mesero
     * @example
     * // Get one Mesero
     * const mesero = await prisma.mesero.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeseroFindUniqueArgs>(args: SelectSubset<T, MeseroFindUniqueArgs<ExtArgs>>): Prisma__MeseroClient<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mesero that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeseroFindUniqueOrThrowArgs} args - Arguments to find a Mesero
     * @example
     * // Get one Mesero
     * const mesero = await prisma.mesero.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeseroFindUniqueOrThrowArgs>(args: SelectSubset<T, MeseroFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MeseroClient<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mesero that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeseroFindFirstArgs} args - Arguments to find a Mesero
     * @example
     * // Get one Mesero
     * const mesero = await prisma.mesero.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeseroFindFirstArgs>(args?: SelectSubset<T, MeseroFindFirstArgs<ExtArgs>>): Prisma__MeseroClient<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mesero that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeseroFindFirstOrThrowArgs} args - Arguments to find a Mesero
     * @example
     * // Get one Mesero
     * const mesero = await prisma.mesero.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeseroFindFirstOrThrowArgs>(args?: SelectSubset<T, MeseroFindFirstOrThrowArgs<ExtArgs>>): Prisma__MeseroClient<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Meseros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeseroFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meseros
     * const meseros = await prisma.mesero.findMany()
     * 
     * // Get first 10 Meseros
     * const meseros = await prisma.mesero.findMany({ take: 10 })
     * 
     * // Only select the `id_mesero`
     * const meseroWithId_meseroOnly = await prisma.mesero.findMany({ select: { id_mesero: true } })
     * 
     */
    findMany<T extends MeseroFindManyArgs>(args?: SelectSubset<T, MeseroFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mesero.
     * @param {MeseroCreateArgs} args - Arguments to create a Mesero.
     * @example
     * // Create one Mesero
     * const Mesero = await prisma.mesero.create({
     *   data: {
     *     // ... data to create a Mesero
     *   }
     * })
     * 
     */
    create<T extends MeseroCreateArgs>(args: SelectSubset<T, MeseroCreateArgs<ExtArgs>>): Prisma__MeseroClient<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Meseros.
     * @param {MeseroCreateManyArgs} args - Arguments to create many Meseros.
     * @example
     * // Create many Meseros
     * const mesero = await prisma.mesero.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MeseroCreateManyArgs>(args?: SelectSubset<T, MeseroCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Meseros and returns the data saved in the database.
     * @param {MeseroCreateManyAndReturnArgs} args - Arguments to create many Meseros.
     * @example
     * // Create many Meseros
     * const mesero = await prisma.mesero.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Meseros and only return the `id_mesero`
     * const meseroWithId_meseroOnly = await prisma.mesero.createManyAndReturn({
     *   select: { id_mesero: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MeseroCreateManyAndReturnArgs>(args?: SelectSubset<T, MeseroCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mesero.
     * @param {MeseroDeleteArgs} args - Arguments to delete one Mesero.
     * @example
     * // Delete one Mesero
     * const Mesero = await prisma.mesero.delete({
     *   where: {
     *     // ... filter to delete one Mesero
     *   }
     * })
     * 
     */
    delete<T extends MeseroDeleteArgs>(args: SelectSubset<T, MeseroDeleteArgs<ExtArgs>>): Prisma__MeseroClient<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mesero.
     * @param {MeseroUpdateArgs} args - Arguments to update one Mesero.
     * @example
     * // Update one Mesero
     * const mesero = await prisma.mesero.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MeseroUpdateArgs>(args: SelectSubset<T, MeseroUpdateArgs<ExtArgs>>): Prisma__MeseroClient<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Meseros.
     * @param {MeseroDeleteManyArgs} args - Arguments to filter Meseros to delete.
     * @example
     * // Delete a few Meseros
     * const { count } = await prisma.mesero.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MeseroDeleteManyArgs>(args?: SelectSubset<T, MeseroDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meseros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeseroUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meseros
     * const mesero = await prisma.mesero.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MeseroUpdateManyArgs>(args: SelectSubset<T, MeseroUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meseros and returns the data updated in the database.
     * @param {MeseroUpdateManyAndReturnArgs} args - Arguments to update many Meseros.
     * @example
     * // Update many Meseros
     * const mesero = await prisma.mesero.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Meseros and only return the `id_mesero`
     * const meseroWithId_meseroOnly = await prisma.mesero.updateManyAndReturn({
     *   select: { id_mesero: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MeseroUpdateManyAndReturnArgs>(args: SelectSubset<T, MeseroUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mesero.
     * @param {MeseroUpsertArgs} args - Arguments to update or create a Mesero.
     * @example
     * // Update or create a Mesero
     * const mesero = await prisma.mesero.upsert({
     *   create: {
     *     // ... data to create a Mesero
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mesero we want to update
     *   }
     * })
     */
    upsert<T extends MeseroUpsertArgs>(args: SelectSubset<T, MeseroUpsertArgs<ExtArgs>>): Prisma__MeseroClient<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Meseros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeseroCountArgs} args - Arguments to filter Meseros to count.
     * @example
     * // Count the number of Meseros
     * const count = await prisma.mesero.count({
     *   where: {
     *     // ... the filter for the Meseros we want to count
     *   }
     * })
    **/
    count<T extends MeseroCountArgs>(
      args?: Subset<T, MeseroCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeseroCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mesero.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeseroAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MeseroAggregateArgs>(args: Subset<T, MeseroAggregateArgs>): Prisma.PrismaPromise<GetMeseroAggregateType<T>>

    /**
     * Group by Mesero.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeseroGroupByArgs} args - Group by arguments.
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
      T extends MeseroGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeseroGroupByArgs['orderBy'] }
        : { orderBy?: MeseroGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MeseroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeseroGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mesero model
   */
  readonly fields: MeseroFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mesero.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeseroClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comandas<T extends Mesero$comandasArgs<ExtArgs> = {}>(args?: Subset<T, Mesero$comandasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Mesero model
   */
  interface MeseroFieldRefs {
    readonly id_mesero: FieldRef<"Mesero", 'Int'>
    readonly nombre: FieldRef<"Mesero", 'String'>
    readonly turno: FieldRef<"Mesero", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Mesero findUnique
   */
  export type MeseroFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeseroInclude<ExtArgs> | null
    /**
     * Filter, which Mesero to fetch.
     */
    where: MeseroWhereUniqueInput
  }

  /**
   * Mesero findUniqueOrThrow
   */
  export type MeseroFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeseroInclude<ExtArgs> | null
    /**
     * Filter, which Mesero to fetch.
     */
    where: MeseroWhereUniqueInput
  }

  /**
   * Mesero findFirst
   */
  export type MeseroFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeseroInclude<ExtArgs> | null
    /**
     * Filter, which Mesero to fetch.
     */
    where?: MeseroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meseros to fetch.
     */
    orderBy?: MeseroOrderByWithRelationInput | MeseroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meseros.
     */
    cursor?: MeseroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meseros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meseros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meseros.
     */
    distinct?: MeseroScalarFieldEnum | MeseroScalarFieldEnum[]
  }

  /**
   * Mesero findFirstOrThrow
   */
  export type MeseroFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeseroInclude<ExtArgs> | null
    /**
     * Filter, which Mesero to fetch.
     */
    where?: MeseroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meseros to fetch.
     */
    orderBy?: MeseroOrderByWithRelationInput | MeseroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Meseros.
     */
    cursor?: MeseroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meseros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meseros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Meseros.
     */
    distinct?: MeseroScalarFieldEnum | MeseroScalarFieldEnum[]
  }

  /**
   * Mesero findMany
   */
  export type MeseroFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeseroInclude<ExtArgs> | null
    /**
     * Filter, which Meseros to fetch.
     */
    where?: MeseroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Meseros to fetch.
     */
    orderBy?: MeseroOrderByWithRelationInput | MeseroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Meseros.
     */
    cursor?: MeseroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Meseros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Meseros.
     */
    skip?: number
    distinct?: MeseroScalarFieldEnum | MeseroScalarFieldEnum[]
  }

  /**
   * Mesero create
   */
  export type MeseroCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeseroInclude<ExtArgs> | null
    /**
     * The data needed to create a Mesero.
     */
    data: XOR<MeseroCreateInput, MeseroUncheckedCreateInput>
  }

  /**
   * Mesero createMany
   */
  export type MeseroCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Meseros.
     */
    data: MeseroCreateManyInput | MeseroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mesero createManyAndReturn
   */
  export type MeseroCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * The data used to create many Meseros.
     */
    data: MeseroCreateManyInput | MeseroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mesero update
   */
  export type MeseroUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeseroInclude<ExtArgs> | null
    /**
     * The data needed to update a Mesero.
     */
    data: XOR<MeseroUpdateInput, MeseroUncheckedUpdateInput>
    /**
     * Choose, which Mesero to update.
     */
    where: MeseroWhereUniqueInput
  }

  /**
   * Mesero updateMany
   */
  export type MeseroUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Meseros.
     */
    data: XOR<MeseroUpdateManyMutationInput, MeseroUncheckedUpdateManyInput>
    /**
     * Filter which Meseros to update
     */
    where?: MeseroWhereInput
    /**
     * Limit how many Meseros to update.
     */
    limit?: number
  }

  /**
   * Mesero updateManyAndReturn
   */
  export type MeseroUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * The data used to update Meseros.
     */
    data: XOR<MeseroUpdateManyMutationInput, MeseroUncheckedUpdateManyInput>
    /**
     * Filter which Meseros to update
     */
    where?: MeseroWhereInput
    /**
     * Limit how many Meseros to update.
     */
    limit?: number
  }

  /**
   * Mesero upsert
   */
  export type MeseroUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeseroInclude<ExtArgs> | null
    /**
     * The filter to search for the Mesero to update in case it exists.
     */
    where: MeseroWhereUniqueInput
    /**
     * In case the Mesero found by the `where` argument doesn't exist, create a new Mesero with this data.
     */
    create: XOR<MeseroCreateInput, MeseroUncheckedCreateInput>
    /**
     * In case the Mesero was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeseroUpdateInput, MeseroUncheckedUpdateInput>
  }

  /**
   * Mesero delete
   */
  export type MeseroDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeseroInclude<ExtArgs> | null
    /**
     * Filter which Mesero to delete.
     */
    where: MeseroWhereUniqueInput
  }

  /**
   * Mesero deleteMany
   */
  export type MeseroDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Meseros to delete
     */
    where?: MeseroWhereInput
    /**
     * Limit how many Meseros to delete.
     */
    limit?: number
  }

  /**
   * Mesero.comandas
   */
  export type Mesero$comandasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
    where?: ComandasWhereInput
    orderBy?: ComandasOrderByWithRelationInput | ComandasOrderByWithRelationInput[]
    cursor?: ComandasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComandasScalarFieldEnum | ComandasScalarFieldEnum[]
  }

  /**
   * Mesero without action
   */
  export type MeseroDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesero
     */
    select?: MeseroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesero
     */
    omit?: MeseroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MeseroInclude<ExtArgs> | null
  }


  /**
   * Model Mesa
   */

  export type AggregateMesa = {
    _count: MesaCountAggregateOutputType | null
    _avg: MesaAvgAggregateOutputType | null
    _sum: MesaSumAggregateOutputType | null
    _min: MesaMinAggregateOutputType | null
    _max: MesaMaxAggregateOutputType | null
  }

  export type MesaAvgAggregateOutputType = {
    id_mesa: number | null
    numero_mesa: number | null
    capacidad: number | null
    junta_id_mesa: number | null
  }

  export type MesaSumAggregateOutputType = {
    id_mesa: number | null
    numero_mesa: number | null
    capacidad: number | null
    junta_id_mesa: number | null
  }

  export type MesaMinAggregateOutputType = {
    id_mesa: number | null
    numero_mesa: number | null
    capacidad: number | null
    estado: string | null
    junta_id_mesa: number | null
  }

  export type MesaMaxAggregateOutputType = {
    id_mesa: number | null
    numero_mesa: number | null
    capacidad: number | null
    estado: string | null
    junta_id_mesa: number | null
  }

  export type MesaCountAggregateOutputType = {
    id_mesa: number
    numero_mesa: number
    capacidad: number
    estado: number
    junta_id_mesa: number
    _all: number
  }


  export type MesaAvgAggregateInputType = {
    id_mesa?: true
    numero_mesa?: true
    capacidad?: true
    junta_id_mesa?: true
  }

  export type MesaSumAggregateInputType = {
    id_mesa?: true
    numero_mesa?: true
    capacidad?: true
    junta_id_mesa?: true
  }

  export type MesaMinAggregateInputType = {
    id_mesa?: true
    numero_mesa?: true
    capacidad?: true
    estado?: true
    junta_id_mesa?: true
  }

  export type MesaMaxAggregateInputType = {
    id_mesa?: true
    numero_mesa?: true
    capacidad?: true
    estado?: true
    junta_id_mesa?: true
  }

  export type MesaCountAggregateInputType = {
    id_mesa?: true
    numero_mesa?: true
    capacidad?: true
    estado?: true
    junta_id_mesa?: true
    _all?: true
  }

  export type MesaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mesa to aggregate.
     */
    where?: MesaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesas to fetch.
     */
    orderBy?: MesaOrderByWithRelationInput | MesaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MesaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mesas
    **/
    _count?: true | MesaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MesaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MesaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MesaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MesaMaxAggregateInputType
  }

  export type GetMesaAggregateType<T extends MesaAggregateArgs> = {
        [P in keyof T & keyof AggregateMesa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMesa[P]>
      : GetScalarType<T[P], AggregateMesa[P]>
  }




  export type MesaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MesaWhereInput
    orderBy?: MesaOrderByWithAggregationInput | MesaOrderByWithAggregationInput[]
    by: MesaScalarFieldEnum[] | MesaScalarFieldEnum
    having?: MesaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MesaCountAggregateInputType | true
    _avg?: MesaAvgAggregateInputType
    _sum?: MesaSumAggregateInputType
    _min?: MesaMinAggregateInputType
    _max?: MesaMaxAggregateInputType
  }

  export type MesaGroupByOutputType = {
    id_mesa: number
    numero_mesa: number
    capacidad: number
    estado: string
    junta_id_mesa: number | null
    _count: MesaCountAggregateOutputType | null
    _avg: MesaAvgAggregateOutputType | null
    _sum: MesaSumAggregateOutputType | null
    _min: MesaMinAggregateOutputType | null
    _max: MesaMaxAggregateOutputType | null
  }

  type GetMesaGroupByPayload<T extends MesaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MesaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MesaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MesaGroupByOutputType[P]>
            : GetScalarType<T[P], MesaGroupByOutputType[P]>
        }
      >
    >


  export type MesaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_mesa?: boolean
    numero_mesa?: boolean
    capacidad?: boolean
    estado?: boolean
    junta_id_mesa?: boolean
    comandas?: boolean | Mesa$comandasArgs<ExtArgs>
    _count?: boolean | MesaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mesa"]>

  export type MesaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_mesa?: boolean
    numero_mesa?: boolean
    capacidad?: boolean
    estado?: boolean
    junta_id_mesa?: boolean
  }, ExtArgs["result"]["mesa"]>

  export type MesaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_mesa?: boolean
    numero_mesa?: boolean
    capacidad?: boolean
    estado?: boolean
    junta_id_mesa?: boolean
  }, ExtArgs["result"]["mesa"]>

  export type MesaSelectScalar = {
    id_mesa?: boolean
    numero_mesa?: boolean
    capacidad?: boolean
    estado?: boolean
    junta_id_mesa?: boolean
  }

  export type MesaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_mesa" | "numero_mesa" | "capacidad" | "estado" | "junta_id_mesa", ExtArgs["result"]["mesa"]>
  export type MesaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comandas?: boolean | Mesa$comandasArgs<ExtArgs>
    _count?: boolean | MesaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MesaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MesaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MesaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mesa"
    objects: {
      comandas: Prisma.$ComandasPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_mesa: number
      numero_mesa: number
      capacidad: number
      estado: string
      junta_id_mesa: number | null
    }, ExtArgs["result"]["mesa"]>
    composites: {}
  }

  type MesaGetPayload<S extends boolean | null | undefined | MesaDefaultArgs> = $Result.GetResult<Prisma.$MesaPayload, S>

  type MesaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MesaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MesaCountAggregateInputType | true
    }

  export interface MesaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mesa'], meta: { name: 'Mesa' } }
    /**
     * Find zero or one Mesa that matches the filter.
     * @param {MesaFindUniqueArgs} args - Arguments to find a Mesa
     * @example
     * // Get one Mesa
     * const mesa = await prisma.mesa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MesaFindUniqueArgs>(args: SelectSubset<T, MesaFindUniqueArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mesa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MesaFindUniqueOrThrowArgs} args - Arguments to find a Mesa
     * @example
     * // Get one Mesa
     * const mesa = await prisma.mesa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MesaFindUniqueOrThrowArgs>(args: SelectSubset<T, MesaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mesa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaFindFirstArgs} args - Arguments to find a Mesa
     * @example
     * // Get one Mesa
     * const mesa = await prisma.mesa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MesaFindFirstArgs>(args?: SelectSubset<T, MesaFindFirstArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mesa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaFindFirstOrThrowArgs} args - Arguments to find a Mesa
     * @example
     * // Get one Mesa
     * const mesa = await prisma.mesa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MesaFindFirstOrThrowArgs>(args?: SelectSubset<T, MesaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mesas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mesas
     * const mesas = await prisma.mesa.findMany()
     * 
     * // Get first 10 Mesas
     * const mesas = await prisma.mesa.findMany({ take: 10 })
     * 
     * // Only select the `id_mesa`
     * const mesaWithId_mesaOnly = await prisma.mesa.findMany({ select: { id_mesa: true } })
     * 
     */
    findMany<T extends MesaFindManyArgs>(args?: SelectSubset<T, MesaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mesa.
     * @param {MesaCreateArgs} args - Arguments to create a Mesa.
     * @example
     * // Create one Mesa
     * const Mesa = await prisma.mesa.create({
     *   data: {
     *     // ... data to create a Mesa
     *   }
     * })
     * 
     */
    create<T extends MesaCreateArgs>(args: SelectSubset<T, MesaCreateArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mesas.
     * @param {MesaCreateManyArgs} args - Arguments to create many Mesas.
     * @example
     * // Create many Mesas
     * const mesa = await prisma.mesa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MesaCreateManyArgs>(args?: SelectSubset<T, MesaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mesas and returns the data saved in the database.
     * @param {MesaCreateManyAndReturnArgs} args - Arguments to create many Mesas.
     * @example
     * // Create many Mesas
     * const mesa = await prisma.mesa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mesas and only return the `id_mesa`
     * const mesaWithId_mesaOnly = await prisma.mesa.createManyAndReturn({
     *   select: { id_mesa: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MesaCreateManyAndReturnArgs>(args?: SelectSubset<T, MesaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mesa.
     * @param {MesaDeleteArgs} args - Arguments to delete one Mesa.
     * @example
     * // Delete one Mesa
     * const Mesa = await prisma.mesa.delete({
     *   where: {
     *     // ... filter to delete one Mesa
     *   }
     * })
     * 
     */
    delete<T extends MesaDeleteArgs>(args: SelectSubset<T, MesaDeleteArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mesa.
     * @param {MesaUpdateArgs} args - Arguments to update one Mesa.
     * @example
     * // Update one Mesa
     * const mesa = await prisma.mesa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MesaUpdateArgs>(args: SelectSubset<T, MesaUpdateArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mesas.
     * @param {MesaDeleteManyArgs} args - Arguments to filter Mesas to delete.
     * @example
     * // Delete a few Mesas
     * const { count } = await prisma.mesa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MesaDeleteManyArgs>(args?: SelectSubset<T, MesaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mesas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mesas
     * const mesa = await prisma.mesa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MesaUpdateManyArgs>(args: SelectSubset<T, MesaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mesas and returns the data updated in the database.
     * @param {MesaUpdateManyAndReturnArgs} args - Arguments to update many Mesas.
     * @example
     * // Update many Mesas
     * const mesa = await prisma.mesa.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mesas and only return the `id_mesa`
     * const mesaWithId_mesaOnly = await prisma.mesa.updateManyAndReturn({
     *   select: { id_mesa: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MesaUpdateManyAndReturnArgs>(args: SelectSubset<T, MesaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mesa.
     * @param {MesaUpsertArgs} args - Arguments to update or create a Mesa.
     * @example
     * // Update or create a Mesa
     * const mesa = await prisma.mesa.upsert({
     *   create: {
     *     // ... data to create a Mesa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mesa we want to update
     *   }
     * })
     */
    upsert<T extends MesaUpsertArgs>(args: SelectSubset<T, MesaUpsertArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mesas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaCountArgs} args - Arguments to filter Mesas to count.
     * @example
     * // Count the number of Mesas
     * const count = await prisma.mesa.count({
     *   where: {
     *     // ... the filter for the Mesas we want to count
     *   }
     * })
    **/
    count<T extends MesaCountArgs>(
      args?: Subset<T, MesaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MesaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mesa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MesaAggregateArgs>(args: Subset<T, MesaAggregateArgs>): Prisma.PrismaPromise<GetMesaAggregateType<T>>

    /**
     * Group by Mesa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesaGroupByArgs} args - Group by arguments.
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
      T extends MesaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MesaGroupByArgs['orderBy'] }
        : { orderBy?: MesaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MesaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMesaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mesa model
   */
  readonly fields: MesaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mesa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MesaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comandas<T extends Mesa$comandasArgs<ExtArgs> = {}>(args?: Subset<T, Mesa$comandasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Mesa model
   */
  interface MesaFieldRefs {
    readonly id_mesa: FieldRef<"Mesa", 'Int'>
    readonly numero_mesa: FieldRef<"Mesa", 'Int'>
    readonly capacidad: FieldRef<"Mesa", 'Int'>
    readonly estado: FieldRef<"Mesa", 'String'>
    readonly junta_id_mesa: FieldRef<"Mesa", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Mesa findUnique
   */
  export type MesaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter, which Mesa to fetch.
     */
    where: MesaWhereUniqueInput
  }

  /**
   * Mesa findUniqueOrThrow
   */
  export type MesaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter, which Mesa to fetch.
     */
    where: MesaWhereUniqueInput
  }

  /**
   * Mesa findFirst
   */
  export type MesaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter, which Mesa to fetch.
     */
    where?: MesaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesas to fetch.
     */
    orderBy?: MesaOrderByWithRelationInput | MesaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mesas.
     */
    cursor?: MesaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mesas.
     */
    distinct?: MesaScalarFieldEnum | MesaScalarFieldEnum[]
  }

  /**
   * Mesa findFirstOrThrow
   */
  export type MesaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter, which Mesa to fetch.
     */
    where?: MesaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesas to fetch.
     */
    orderBy?: MesaOrderByWithRelationInput | MesaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mesas.
     */
    cursor?: MesaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mesas.
     */
    distinct?: MesaScalarFieldEnum | MesaScalarFieldEnum[]
  }

  /**
   * Mesa findMany
   */
  export type MesaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter, which Mesas to fetch.
     */
    where?: MesaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesas to fetch.
     */
    orderBy?: MesaOrderByWithRelationInput | MesaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mesas.
     */
    cursor?: MesaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesas.
     */
    skip?: number
    distinct?: MesaScalarFieldEnum | MesaScalarFieldEnum[]
  }

  /**
   * Mesa create
   */
  export type MesaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * The data needed to create a Mesa.
     */
    data: XOR<MesaCreateInput, MesaUncheckedCreateInput>
  }

  /**
   * Mesa createMany
   */
  export type MesaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mesas.
     */
    data: MesaCreateManyInput | MesaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mesa createManyAndReturn
   */
  export type MesaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * The data used to create many Mesas.
     */
    data: MesaCreateManyInput | MesaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mesa update
   */
  export type MesaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * The data needed to update a Mesa.
     */
    data: XOR<MesaUpdateInput, MesaUncheckedUpdateInput>
    /**
     * Choose, which Mesa to update.
     */
    where: MesaWhereUniqueInput
  }

  /**
   * Mesa updateMany
   */
  export type MesaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mesas.
     */
    data: XOR<MesaUpdateManyMutationInput, MesaUncheckedUpdateManyInput>
    /**
     * Filter which Mesas to update
     */
    where?: MesaWhereInput
    /**
     * Limit how many Mesas to update.
     */
    limit?: number
  }

  /**
   * Mesa updateManyAndReturn
   */
  export type MesaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * The data used to update Mesas.
     */
    data: XOR<MesaUpdateManyMutationInput, MesaUncheckedUpdateManyInput>
    /**
     * Filter which Mesas to update
     */
    where?: MesaWhereInput
    /**
     * Limit how many Mesas to update.
     */
    limit?: number
  }

  /**
   * Mesa upsert
   */
  export type MesaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * The filter to search for the Mesa to update in case it exists.
     */
    where: MesaWhereUniqueInput
    /**
     * In case the Mesa found by the `where` argument doesn't exist, create a new Mesa with this data.
     */
    create: XOR<MesaCreateInput, MesaUncheckedCreateInput>
    /**
     * In case the Mesa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MesaUpdateInput, MesaUncheckedUpdateInput>
  }

  /**
   * Mesa delete
   */
  export type MesaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
    /**
     * Filter which Mesa to delete.
     */
    where: MesaWhereUniqueInput
  }

  /**
   * Mesa deleteMany
   */
  export type MesaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mesas to delete
     */
    where?: MesaWhereInput
    /**
     * Limit how many Mesas to delete.
     */
    limit?: number
  }

  /**
   * Mesa.comandas
   */
  export type Mesa$comandasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
    where?: ComandasWhereInput
    orderBy?: ComandasOrderByWithRelationInput | ComandasOrderByWithRelationInput[]
    cursor?: ComandasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComandasScalarFieldEnum | ComandasScalarFieldEnum[]
  }

  /**
   * Mesa without action
   */
  export type MesaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesa
     */
    select?: MesaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesa
     */
    omit?: MesaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesaInclude<ExtArgs> | null
  }


  /**
   * Model Producto
   */

  export type AggregateProducto = {
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  export type ProductoAvgAggregateOutputType = {
    id_producto: number | null
    precio: Decimal | null
    id_categoria: number | null
    id_subcategoria: number | null
    tiempo_prep: number | null
  }

  export type ProductoSumAggregateOutputType = {
    id_producto: number | null
    precio: Decimal | null
    id_categoria: number | null
    id_subcategoria: number | null
    tiempo_prep: number | null
  }

  export type ProductoMinAggregateOutputType = {
    id_producto: number | null
    nombre: string | null
    precio: Decimal | null
    id_categoria: number | null
    id_subcategoria: number | null
    descripcion: string | null
    tiempo_prep: number | null
    pasos: string | null
    activo: boolean | null
    eliminado: boolean | null
  }

  export type ProductoMaxAggregateOutputType = {
    id_producto: number | null
    nombre: string | null
    precio: Decimal | null
    id_categoria: number | null
    id_subcategoria: number | null
    descripcion: string | null
    tiempo_prep: number | null
    pasos: string | null
    activo: boolean | null
    eliminado: boolean | null
  }

  export type ProductoCountAggregateOutputType = {
    id_producto: number
    nombre: number
    precio: number
    id_categoria: number
    id_subcategoria: number
    descripcion: number
    tiempo_prep: number
    pasos: number
    activo: number
    eliminado: number
    _all: number
  }


  export type ProductoAvgAggregateInputType = {
    id_producto?: true
    precio?: true
    id_categoria?: true
    id_subcategoria?: true
    tiempo_prep?: true
  }

  export type ProductoSumAggregateInputType = {
    id_producto?: true
    precio?: true
    id_categoria?: true
    id_subcategoria?: true
    tiempo_prep?: true
  }

  export type ProductoMinAggregateInputType = {
    id_producto?: true
    nombre?: true
    precio?: true
    id_categoria?: true
    id_subcategoria?: true
    descripcion?: true
    tiempo_prep?: true
    pasos?: true
    activo?: true
    eliminado?: true
  }

  export type ProductoMaxAggregateInputType = {
    id_producto?: true
    nombre?: true
    precio?: true
    id_categoria?: true
    id_subcategoria?: true
    descripcion?: true
    tiempo_prep?: true
    pasos?: true
    activo?: true
    eliminado?: true
  }

  export type ProductoCountAggregateInputType = {
    id_producto?: true
    nombre?: true
    precio?: true
    id_categoria?: true
    id_subcategoria?: true
    descripcion?: true
    tiempo_prep?: true
    pasos?: true
    activo?: true
    eliminado?: true
    _all?: true
  }

  export type ProductoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Producto to aggregate.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Productos
    **/
    _count?: true | ProductoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductoMaxAggregateInputType
  }

  export type GetProductoAggregateType<T extends ProductoAggregateArgs> = {
        [P in keyof T & keyof AggregateProducto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProducto[P]>
      : GetScalarType<T[P], AggregateProducto[P]>
  }




  export type ProductoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithAggregationInput | ProductoOrderByWithAggregationInput[]
    by: ProductoScalarFieldEnum[] | ProductoScalarFieldEnum
    having?: ProductoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductoCountAggregateInputType | true
    _avg?: ProductoAvgAggregateInputType
    _sum?: ProductoSumAggregateInputType
    _min?: ProductoMinAggregateInputType
    _max?: ProductoMaxAggregateInputType
  }

  export type ProductoGroupByOutputType = {
    id_producto: number
    nombre: string
    precio: Decimal
    id_categoria: number
    id_subcategoria: number
    descripcion: string | null
    tiempo_prep: number
    pasos: string | null
    activo: boolean
    eliminado: boolean
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  type GetProductoGroupByPayload<T extends ProductoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductoGroupByOutputType[P]>
            : GetScalarType<T[P], ProductoGroupByOutputType[P]>
        }
      >
    >


  export type ProductoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_producto?: boolean
    nombre?: boolean
    precio?: boolean
    id_categoria?: boolean
    id_subcategoria?: boolean
    descripcion?: boolean
    tiempo_prep?: boolean
    pasos?: boolean
    activo?: boolean
    eliminado?: boolean
    detalles?: boolean | Producto$detallesArgs<ExtArgs>
    historial?: boolean | Producto$historialArgs<ExtArgs>
    aditamentos?: boolean | Producto$aditamentosArgs<ExtArgs>
    imagen?: boolean | Producto$imagenArgs<ExtArgs>
    categoriaRel?: boolean | CategoriaDefaultArgs<ExtArgs>
    subcategoria?: boolean | SubCategoriaDefaultArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_producto?: boolean
    nombre?: boolean
    precio?: boolean
    id_categoria?: boolean
    id_subcategoria?: boolean
    descripcion?: boolean
    tiempo_prep?: boolean
    pasos?: boolean
    activo?: boolean
    eliminado?: boolean
    categoriaRel?: boolean | CategoriaDefaultArgs<ExtArgs>
    subcategoria?: boolean | SubCategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_producto?: boolean
    nombre?: boolean
    precio?: boolean
    id_categoria?: boolean
    id_subcategoria?: boolean
    descripcion?: boolean
    tiempo_prep?: boolean
    pasos?: boolean
    activo?: boolean
    eliminado?: boolean
    categoriaRel?: boolean | CategoriaDefaultArgs<ExtArgs>
    subcategoria?: boolean | SubCategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectScalar = {
    id_producto?: boolean
    nombre?: boolean
    precio?: boolean
    id_categoria?: boolean
    id_subcategoria?: boolean
    descripcion?: boolean
    tiempo_prep?: boolean
    pasos?: boolean
    activo?: boolean
    eliminado?: boolean
  }

  export type ProductoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_producto" | "nombre" | "precio" | "id_categoria" | "id_subcategoria" | "descripcion" | "tiempo_prep" | "pasos" | "activo" | "eliminado", ExtArgs["result"]["producto"]>
  export type ProductoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detalles?: boolean | Producto$detallesArgs<ExtArgs>
    historial?: boolean | Producto$historialArgs<ExtArgs>
    aditamentos?: boolean | Producto$aditamentosArgs<ExtArgs>
    imagen?: boolean | Producto$imagenArgs<ExtArgs>
    categoriaRel?: boolean | CategoriaDefaultArgs<ExtArgs>
    subcategoria?: boolean | SubCategoriaDefaultArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoriaRel?: boolean | CategoriaDefaultArgs<ExtArgs>
    subcategoria?: boolean | SubCategoriaDefaultArgs<ExtArgs>
  }
  export type ProductoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoriaRel?: boolean | CategoriaDefaultArgs<ExtArgs>
    subcategoria?: boolean | SubCategoriaDefaultArgs<ExtArgs>
  }

  export type $ProductoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Producto"
    objects: {
      detalles: Prisma.$DetalleComandaPayload<ExtArgs>[]
      historial: Prisma.$HistorialAnaliticoPayload<ExtArgs>[]
      aditamentos: Prisma.$ProductoAditamentosPayload<ExtArgs>[]
      imagen: Prisma.$ProductoImagenPayload<ExtArgs>[]
      categoriaRel: Prisma.$CategoriaPayload<ExtArgs>
      subcategoria: Prisma.$SubCategoriaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_producto: number
      nombre: string
      precio: Prisma.Decimal
      id_categoria: number
      id_subcategoria: number
      descripcion: string | null
      tiempo_prep: number
      pasos: string | null
      activo: boolean
      eliminado: boolean
    }, ExtArgs["result"]["producto"]>
    composites: {}
  }

  type ProductoGetPayload<S extends boolean | null | undefined | ProductoDefaultArgs> = $Result.GetResult<Prisma.$ProductoPayload, S>

  type ProductoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductoCountAggregateInputType | true
    }

  export interface ProductoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Producto'], meta: { name: 'Producto' } }
    /**
     * Find zero or one Producto that matches the filter.
     * @param {ProductoFindUniqueArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductoFindUniqueArgs>(args: SelectSubset<T, ProductoFindUniqueArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Producto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductoFindUniqueOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindFirstArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductoFindFirstArgs>(args?: SelectSubset<T, ProductoFindFirstArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindFirstOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Productos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productos
     * const productos = await prisma.producto.findMany()
     * 
     * // Get first 10 Productos
     * const productos = await prisma.producto.findMany({ take: 10 })
     * 
     * // Only select the `id_producto`
     * const productoWithId_productoOnly = await prisma.producto.findMany({ select: { id_producto: true } })
     * 
     */
    findMany<T extends ProductoFindManyArgs>(args?: SelectSubset<T, ProductoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Producto.
     * @param {ProductoCreateArgs} args - Arguments to create a Producto.
     * @example
     * // Create one Producto
     * const Producto = await prisma.producto.create({
     *   data: {
     *     // ... data to create a Producto
     *   }
     * })
     * 
     */
    create<T extends ProductoCreateArgs>(args: SelectSubset<T, ProductoCreateArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Productos.
     * @param {ProductoCreateManyArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const producto = await prisma.producto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductoCreateManyArgs>(args?: SelectSubset<T, ProductoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Productos and returns the data saved in the database.
     * @param {ProductoCreateManyAndReturnArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const producto = await prisma.producto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Productos and only return the `id_producto`
     * const productoWithId_productoOnly = await prisma.producto.createManyAndReturn({
     *   select: { id_producto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Producto.
     * @param {ProductoDeleteArgs} args - Arguments to delete one Producto.
     * @example
     * // Delete one Producto
     * const Producto = await prisma.producto.delete({
     *   where: {
     *     // ... filter to delete one Producto
     *   }
     * })
     * 
     */
    delete<T extends ProductoDeleteArgs>(args: SelectSubset<T, ProductoDeleteArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Producto.
     * @param {ProductoUpdateArgs} args - Arguments to update one Producto.
     * @example
     * // Update one Producto
     * const producto = await prisma.producto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductoUpdateArgs>(args: SelectSubset<T, ProductoUpdateArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Productos.
     * @param {ProductoDeleteManyArgs} args - Arguments to filter Productos to delete.
     * @example
     * // Delete a few Productos
     * const { count } = await prisma.producto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductoDeleteManyArgs>(args?: SelectSubset<T, ProductoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productos
     * const producto = await prisma.producto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductoUpdateManyArgs>(args: SelectSubset<T, ProductoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos and returns the data updated in the database.
     * @param {ProductoUpdateManyAndReturnArgs} args - Arguments to update many Productos.
     * @example
     * // Update many Productos
     * const producto = await prisma.producto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Productos and only return the `id_producto`
     * const productoWithId_productoOnly = await prisma.producto.updateManyAndReturn({
     *   select: { id_producto: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Producto.
     * @param {ProductoUpsertArgs} args - Arguments to update or create a Producto.
     * @example
     * // Update or create a Producto
     * const producto = await prisma.producto.upsert({
     *   create: {
     *     // ... data to create a Producto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Producto we want to update
     *   }
     * })
     */
    upsert<T extends ProductoUpsertArgs>(args: SelectSubset<T, ProductoUpsertArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoCountArgs} args - Arguments to filter Productos to count.
     * @example
     * // Count the number of Productos
     * const count = await prisma.producto.count({
     *   where: {
     *     // ... the filter for the Productos we want to count
     *   }
     * })
    **/
    count<T extends ProductoCountArgs>(
      args?: Subset<T, ProductoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductoAggregateArgs>(args: Subset<T, ProductoAggregateArgs>): Prisma.PrismaPromise<GetProductoAggregateType<T>>

    /**
     * Group by Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoGroupByArgs} args - Group by arguments.
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
      T extends ProductoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductoGroupByArgs['orderBy'] }
        : { orderBy?: ProductoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Producto model
   */
  readonly fields: ProductoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Producto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    detalles<T extends Producto$detallesArgs<ExtArgs> = {}>(args?: Subset<T, Producto$detallesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    historial<T extends Producto$historialArgs<ExtArgs> = {}>(args?: Subset<T, Producto$historialArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    aditamentos<T extends Producto$aditamentosArgs<ExtArgs> = {}>(args?: Subset<T, Producto$aditamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    imagen<T extends Producto$imagenArgs<ExtArgs> = {}>(args?: Subset<T, Producto$imagenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categoriaRel<T extends CategoriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoriaDefaultArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subcategoria<T extends SubCategoriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubCategoriaDefaultArgs<ExtArgs>>): Prisma__SubCategoriaClient<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Producto model
   */
  interface ProductoFieldRefs {
    readonly id_producto: FieldRef<"Producto", 'Int'>
    readonly nombre: FieldRef<"Producto", 'String'>
    readonly precio: FieldRef<"Producto", 'Decimal'>
    readonly id_categoria: FieldRef<"Producto", 'Int'>
    readonly id_subcategoria: FieldRef<"Producto", 'Int'>
    readonly descripcion: FieldRef<"Producto", 'String'>
    readonly tiempo_prep: FieldRef<"Producto", 'Int'>
    readonly pasos: FieldRef<"Producto", 'String'>
    readonly activo: FieldRef<"Producto", 'Boolean'>
    readonly eliminado: FieldRef<"Producto", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Producto findUnique
   */
  export type ProductoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto findUniqueOrThrow
   */
  export type ProductoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto findFirst
   */
  export type ProductoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto findFirstOrThrow
   */
  export type ProductoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto findMany
   */
  export type ProductoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Productos to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto create
   */
  export type ProductoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The data needed to create a Producto.
     */
    data: XOR<ProductoCreateInput, ProductoUncheckedCreateInput>
  }

  /**
   * Producto createMany
   */
  export type ProductoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Productos.
     */
    data: ProductoCreateManyInput | ProductoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Producto createManyAndReturn
   */
  export type ProductoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * The data used to create many Productos.
     */
    data: ProductoCreateManyInput | ProductoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Producto update
   */
  export type ProductoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The data needed to update a Producto.
     */
    data: XOR<ProductoUpdateInput, ProductoUncheckedUpdateInput>
    /**
     * Choose, which Producto to update.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto updateMany
   */
  export type ProductoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Productos.
     */
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyInput>
    /**
     * Filter which Productos to update
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to update.
     */
    limit?: number
  }

  /**
   * Producto updateManyAndReturn
   */
  export type ProductoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * The data used to update Productos.
     */
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyInput>
    /**
     * Filter which Productos to update
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Producto upsert
   */
  export type ProductoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The filter to search for the Producto to update in case it exists.
     */
    where: ProductoWhereUniqueInput
    /**
     * In case the Producto found by the `where` argument doesn't exist, create a new Producto with this data.
     */
    create: XOR<ProductoCreateInput, ProductoUncheckedCreateInput>
    /**
     * In case the Producto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductoUpdateInput, ProductoUncheckedUpdateInput>
  }

  /**
   * Producto delete
   */
  export type ProductoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter which Producto to delete.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto deleteMany
   */
  export type ProductoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Productos to delete
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to delete.
     */
    limit?: number
  }

  /**
   * Producto.detalles
   */
  export type Producto$detallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
    where?: DetalleComandaWhereInput
    orderBy?: DetalleComandaOrderByWithRelationInput | DetalleComandaOrderByWithRelationInput[]
    cursor?: DetalleComandaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DetalleComandaScalarFieldEnum | DetalleComandaScalarFieldEnum[]
  }

  /**
   * Producto.historial
   */
  export type Producto$historialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    where?: HistorialAnaliticoWhereInput
    orderBy?: HistorialAnaliticoOrderByWithRelationInput | HistorialAnaliticoOrderByWithRelationInput[]
    cursor?: HistorialAnaliticoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HistorialAnaliticoScalarFieldEnum | HistorialAnaliticoScalarFieldEnum[]
  }

  /**
   * Producto.aditamentos
   */
  export type Producto$aditamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
    where?: ProductoAditamentosWhereInput
    orderBy?: ProductoAditamentosOrderByWithRelationInput | ProductoAditamentosOrderByWithRelationInput[]
    cursor?: ProductoAditamentosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoAditamentosScalarFieldEnum | ProductoAditamentosScalarFieldEnum[]
  }

  /**
   * Producto.imagen
   */
  export type Producto$imagenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenInclude<ExtArgs> | null
    where?: ProductoImagenWhereInput
    orderBy?: ProductoImagenOrderByWithRelationInput | ProductoImagenOrderByWithRelationInput[]
    cursor?: ProductoImagenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoImagenScalarFieldEnum | ProductoImagenScalarFieldEnum[]
  }

  /**
   * Producto without action
   */
  export type ProductoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
  }


  /**
   * Model Aditamento
   */

  export type AggregateAditamento = {
    _count: AditamentoCountAggregateOutputType | null
    _avg: AditamentoAvgAggregateOutputType | null
    _sum: AditamentoSumAggregateOutputType | null
    _min: AditamentoMinAggregateOutputType | null
    _max: AditamentoMaxAggregateOutputType | null
  }

  export type AditamentoAvgAggregateOutputType = {
    id_aditamento: number | null
    precio: number | null
  }

  export type AditamentoSumAggregateOutputType = {
    id_aditamento: number | null
    precio: number | null
  }

  export type AditamentoMinAggregateOutputType = {
    id_aditamento: number | null
    nombre: string | null
    precio: number | null
  }

  export type AditamentoMaxAggregateOutputType = {
    id_aditamento: number | null
    nombre: string | null
    precio: number | null
  }

  export type AditamentoCountAggregateOutputType = {
    id_aditamento: number
    nombre: number
    precio: number
    _all: number
  }


  export type AditamentoAvgAggregateInputType = {
    id_aditamento?: true
    precio?: true
  }

  export type AditamentoSumAggregateInputType = {
    id_aditamento?: true
    precio?: true
  }

  export type AditamentoMinAggregateInputType = {
    id_aditamento?: true
    nombre?: true
    precio?: true
  }

  export type AditamentoMaxAggregateInputType = {
    id_aditamento?: true
    nombre?: true
    precio?: true
  }

  export type AditamentoCountAggregateInputType = {
    id_aditamento?: true
    nombre?: true
    precio?: true
    _all?: true
  }

  export type AditamentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aditamento to aggregate.
     */
    where?: AditamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aditamentos to fetch.
     */
    orderBy?: AditamentoOrderByWithRelationInput | AditamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AditamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aditamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Aditamentos
    **/
    _count?: true | AditamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AditamentoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AditamentoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AditamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AditamentoMaxAggregateInputType
  }

  export type GetAditamentoAggregateType<T extends AditamentoAggregateArgs> = {
        [P in keyof T & keyof AggregateAditamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAditamento[P]>
      : GetScalarType<T[P], AggregateAditamento[P]>
  }




  export type AditamentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AditamentoWhereInput
    orderBy?: AditamentoOrderByWithAggregationInput | AditamentoOrderByWithAggregationInput[]
    by: AditamentoScalarFieldEnum[] | AditamentoScalarFieldEnum
    having?: AditamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AditamentoCountAggregateInputType | true
    _avg?: AditamentoAvgAggregateInputType
    _sum?: AditamentoSumAggregateInputType
    _min?: AditamentoMinAggregateInputType
    _max?: AditamentoMaxAggregateInputType
  }

  export type AditamentoGroupByOutputType = {
    id_aditamento: number
    nombre: string
    precio: number
    _count: AditamentoCountAggregateOutputType | null
    _avg: AditamentoAvgAggregateOutputType | null
    _sum: AditamentoSumAggregateOutputType | null
    _min: AditamentoMinAggregateOutputType | null
    _max: AditamentoMaxAggregateOutputType | null
  }

  type GetAditamentoGroupByPayload<T extends AditamentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AditamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AditamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AditamentoGroupByOutputType[P]>
            : GetScalarType<T[P], AditamentoGroupByOutputType[P]>
        }
      >
    >


  export type AditamentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_aditamento?: boolean
    nombre?: boolean
    precio?: boolean
    comandas?: boolean | Aditamento$comandasArgs<ExtArgs>
    productos?: boolean | Aditamento$productosArgs<ExtArgs>
    _count?: boolean | AditamentoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aditamento"]>

  export type AditamentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_aditamento?: boolean
    nombre?: boolean
    precio?: boolean
  }, ExtArgs["result"]["aditamento"]>

  export type AditamentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_aditamento?: boolean
    nombre?: boolean
    precio?: boolean
  }, ExtArgs["result"]["aditamento"]>

  export type AditamentoSelectScalar = {
    id_aditamento?: boolean
    nombre?: boolean
    precio?: boolean
  }

  export type AditamentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_aditamento" | "nombre" | "precio", ExtArgs["result"]["aditamento"]>
  export type AditamentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comandas?: boolean | Aditamento$comandasArgs<ExtArgs>
    productos?: boolean | Aditamento$productosArgs<ExtArgs>
    _count?: boolean | AditamentoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AditamentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AditamentoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AditamentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Aditamento"
    objects: {
      comandas: Prisma.$ComandaAditamentosPayload<ExtArgs>[]
      productos: Prisma.$ProductoAditamentosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_aditamento: number
      nombre: string
      precio: number
    }, ExtArgs["result"]["aditamento"]>
    composites: {}
  }

  type AditamentoGetPayload<S extends boolean | null | undefined | AditamentoDefaultArgs> = $Result.GetResult<Prisma.$AditamentoPayload, S>

  type AditamentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AditamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AditamentoCountAggregateInputType | true
    }

  export interface AditamentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Aditamento'], meta: { name: 'Aditamento' } }
    /**
     * Find zero or one Aditamento that matches the filter.
     * @param {AditamentoFindUniqueArgs} args - Arguments to find a Aditamento
     * @example
     * // Get one Aditamento
     * const aditamento = await prisma.aditamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AditamentoFindUniqueArgs>(args: SelectSubset<T, AditamentoFindUniqueArgs<ExtArgs>>): Prisma__AditamentoClient<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Aditamento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AditamentoFindUniqueOrThrowArgs} args - Arguments to find a Aditamento
     * @example
     * // Get one Aditamento
     * const aditamento = await prisma.aditamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AditamentoFindUniqueOrThrowArgs>(args: SelectSubset<T, AditamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AditamentoClient<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Aditamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AditamentoFindFirstArgs} args - Arguments to find a Aditamento
     * @example
     * // Get one Aditamento
     * const aditamento = await prisma.aditamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AditamentoFindFirstArgs>(args?: SelectSubset<T, AditamentoFindFirstArgs<ExtArgs>>): Prisma__AditamentoClient<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Aditamento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AditamentoFindFirstOrThrowArgs} args - Arguments to find a Aditamento
     * @example
     * // Get one Aditamento
     * const aditamento = await prisma.aditamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AditamentoFindFirstOrThrowArgs>(args?: SelectSubset<T, AditamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__AditamentoClient<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Aditamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AditamentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Aditamentos
     * const aditamentos = await prisma.aditamento.findMany()
     * 
     * // Get first 10 Aditamentos
     * const aditamentos = await prisma.aditamento.findMany({ take: 10 })
     * 
     * // Only select the `id_aditamento`
     * const aditamentoWithId_aditamentoOnly = await prisma.aditamento.findMany({ select: { id_aditamento: true } })
     * 
     */
    findMany<T extends AditamentoFindManyArgs>(args?: SelectSubset<T, AditamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Aditamento.
     * @param {AditamentoCreateArgs} args - Arguments to create a Aditamento.
     * @example
     * // Create one Aditamento
     * const Aditamento = await prisma.aditamento.create({
     *   data: {
     *     // ... data to create a Aditamento
     *   }
     * })
     * 
     */
    create<T extends AditamentoCreateArgs>(args: SelectSubset<T, AditamentoCreateArgs<ExtArgs>>): Prisma__AditamentoClient<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Aditamentos.
     * @param {AditamentoCreateManyArgs} args - Arguments to create many Aditamentos.
     * @example
     * // Create many Aditamentos
     * const aditamento = await prisma.aditamento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AditamentoCreateManyArgs>(args?: SelectSubset<T, AditamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Aditamentos and returns the data saved in the database.
     * @param {AditamentoCreateManyAndReturnArgs} args - Arguments to create many Aditamentos.
     * @example
     * // Create many Aditamentos
     * const aditamento = await prisma.aditamento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Aditamentos and only return the `id_aditamento`
     * const aditamentoWithId_aditamentoOnly = await prisma.aditamento.createManyAndReturn({
     *   select: { id_aditamento: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AditamentoCreateManyAndReturnArgs>(args?: SelectSubset<T, AditamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Aditamento.
     * @param {AditamentoDeleteArgs} args - Arguments to delete one Aditamento.
     * @example
     * // Delete one Aditamento
     * const Aditamento = await prisma.aditamento.delete({
     *   where: {
     *     // ... filter to delete one Aditamento
     *   }
     * })
     * 
     */
    delete<T extends AditamentoDeleteArgs>(args: SelectSubset<T, AditamentoDeleteArgs<ExtArgs>>): Prisma__AditamentoClient<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Aditamento.
     * @param {AditamentoUpdateArgs} args - Arguments to update one Aditamento.
     * @example
     * // Update one Aditamento
     * const aditamento = await prisma.aditamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AditamentoUpdateArgs>(args: SelectSubset<T, AditamentoUpdateArgs<ExtArgs>>): Prisma__AditamentoClient<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Aditamentos.
     * @param {AditamentoDeleteManyArgs} args - Arguments to filter Aditamentos to delete.
     * @example
     * // Delete a few Aditamentos
     * const { count } = await prisma.aditamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AditamentoDeleteManyArgs>(args?: SelectSubset<T, AditamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Aditamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AditamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Aditamentos
     * const aditamento = await prisma.aditamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AditamentoUpdateManyArgs>(args: SelectSubset<T, AditamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Aditamentos and returns the data updated in the database.
     * @param {AditamentoUpdateManyAndReturnArgs} args - Arguments to update many Aditamentos.
     * @example
     * // Update many Aditamentos
     * const aditamento = await prisma.aditamento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Aditamentos and only return the `id_aditamento`
     * const aditamentoWithId_aditamentoOnly = await prisma.aditamento.updateManyAndReturn({
     *   select: { id_aditamento: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AditamentoUpdateManyAndReturnArgs>(args: SelectSubset<T, AditamentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Aditamento.
     * @param {AditamentoUpsertArgs} args - Arguments to update or create a Aditamento.
     * @example
     * // Update or create a Aditamento
     * const aditamento = await prisma.aditamento.upsert({
     *   create: {
     *     // ... data to create a Aditamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Aditamento we want to update
     *   }
     * })
     */
    upsert<T extends AditamentoUpsertArgs>(args: SelectSubset<T, AditamentoUpsertArgs<ExtArgs>>): Prisma__AditamentoClient<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Aditamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AditamentoCountArgs} args - Arguments to filter Aditamentos to count.
     * @example
     * // Count the number of Aditamentos
     * const count = await prisma.aditamento.count({
     *   where: {
     *     // ... the filter for the Aditamentos we want to count
     *   }
     * })
    **/
    count<T extends AditamentoCountArgs>(
      args?: Subset<T, AditamentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AditamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Aditamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AditamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AditamentoAggregateArgs>(args: Subset<T, AditamentoAggregateArgs>): Prisma.PrismaPromise<GetAditamentoAggregateType<T>>

    /**
     * Group by Aditamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AditamentoGroupByArgs} args - Group by arguments.
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
      T extends AditamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AditamentoGroupByArgs['orderBy'] }
        : { orderBy?: AditamentoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AditamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAditamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Aditamento model
   */
  readonly fields: AditamentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Aditamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AditamentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comandas<T extends Aditamento$comandasArgs<ExtArgs> = {}>(args?: Subset<T, Aditamento$comandasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    productos<T extends Aditamento$productosArgs<ExtArgs> = {}>(args?: Subset<T, Aditamento$productosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Aditamento model
   */
  interface AditamentoFieldRefs {
    readonly id_aditamento: FieldRef<"Aditamento", 'Int'>
    readonly nombre: FieldRef<"Aditamento", 'String'>
    readonly precio: FieldRef<"Aditamento", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Aditamento findUnique
   */
  export type AditamentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AditamentoInclude<ExtArgs> | null
    /**
     * Filter, which Aditamento to fetch.
     */
    where: AditamentoWhereUniqueInput
  }

  /**
   * Aditamento findUniqueOrThrow
   */
  export type AditamentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AditamentoInclude<ExtArgs> | null
    /**
     * Filter, which Aditamento to fetch.
     */
    where: AditamentoWhereUniqueInput
  }

  /**
   * Aditamento findFirst
   */
  export type AditamentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AditamentoInclude<ExtArgs> | null
    /**
     * Filter, which Aditamento to fetch.
     */
    where?: AditamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aditamentos to fetch.
     */
    orderBy?: AditamentoOrderByWithRelationInput | AditamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aditamentos.
     */
    cursor?: AditamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aditamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aditamentos.
     */
    distinct?: AditamentoScalarFieldEnum | AditamentoScalarFieldEnum[]
  }

  /**
   * Aditamento findFirstOrThrow
   */
  export type AditamentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AditamentoInclude<ExtArgs> | null
    /**
     * Filter, which Aditamento to fetch.
     */
    where?: AditamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aditamentos to fetch.
     */
    orderBy?: AditamentoOrderByWithRelationInput | AditamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aditamentos.
     */
    cursor?: AditamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aditamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aditamentos.
     */
    distinct?: AditamentoScalarFieldEnum | AditamentoScalarFieldEnum[]
  }

  /**
   * Aditamento findMany
   */
  export type AditamentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AditamentoInclude<ExtArgs> | null
    /**
     * Filter, which Aditamentos to fetch.
     */
    where?: AditamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aditamentos to fetch.
     */
    orderBy?: AditamentoOrderByWithRelationInput | AditamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Aditamentos.
     */
    cursor?: AditamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aditamentos.
     */
    skip?: number
    distinct?: AditamentoScalarFieldEnum | AditamentoScalarFieldEnum[]
  }

  /**
   * Aditamento create
   */
  export type AditamentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AditamentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Aditamento.
     */
    data: XOR<AditamentoCreateInput, AditamentoUncheckedCreateInput>
  }

  /**
   * Aditamento createMany
   */
  export type AditamentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Aditamentos.
     */
    data: AditamentoCreateManyInput | AditamentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Aditamento createManyAndReturn
   */
  export type AditamentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * The data used to create many Aditamentos.
     */
    data: AditamentoCreateManyInput | AditamentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Aditamento update
   */
  export type AditamentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AditamentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Aditamento.
     */
    data: XOR<AditamentoUpdateInput, AditamentoUncheckedUpdateInput>
    /**
     * Choose, which Aditamento to update.
     */
    where: AditamentoWhereUniqueInput
  }

  /**
   * Aditamento updateMany
   */
  export type AditamentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Aditamentos.
     */
    data: XOR<AditamentoUpdateManyMutationInput, AditamentoUncheckedUpdateManyInput>
    /**
     * Filter which Aditamentos to update
     */
    where?: AditamentoWhereInput
    /**
     * Limit how many Aditamentos to update.
     */
    limit?: number
  }

  /**
   * Aditamento updateManyAndReturn
   */
  export type AditamentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * The data used to update Aditamentos.
     */
    data: XOR<AditamentoUpdateManyMutationInput, AditamentoUncheckedUpdateManyInput>
    /**
     * Filter which Aditamentos to update
     */
    where?: AditamentoWhereInput
    /**
     * Limit how many Aditamentos to update.
     */
    limit?: number
  }

  /**
   * Aditamento upsert
   */
  export type AditamentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AditamentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Aditamento to update in case it exists.
     */
    where: AditamentoWhereUniqueInput
    /**
     * In case the Aditamento found by the `where` argument doesn't exist, create a new Aditamento with this data.
     */
    create: XOR<AditamentoCreateInput, AditamentoUncheckedCreateInput>
    /**
     * In case the Aditamento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AditamentoUpdateInput, AditamentoUncheckedUpdateInput>
  }

  /**
   * Aditamento delete
   */
  export type AditamentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AditamentoInclude<ExtArgs> | null
    /**
     * Filter which Aditamento to delete.
     */
    where: AditamentoWhereUniqueInput
  }

  /**
   * Aditamento deleteMany
   */
  export type AditamentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aditamentos to delete
     */
    where?: AditamentoWhereInput
    /**
     * Limit how many Aditamentos to delete.
     */
    limit?: number
  }

  /**
   * Aditamento.comandas
   */
  export type Aditamento$comandasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
    where?: ComandaAditamentosWhereInput
    orderBy?: ComandaAditamentosOrderByWithRelationInput | ComandaAditamentosOrderByWithRelationInput[]
    cursor?: ComandaAditamentosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComandaAditamentosScalarFieldEnum | ComandaAditamentosScalarFieldEnum[]
  }

  /**
   * Aditamento.productos
   */
  export type Aditamento$productosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
    where?: ProductoAditamentosWhereInput
    orderBy?: ProductoAditamentosOrderByWithRelationInput | ProductoAditamentosOrderByWithRelationInput[]
    cursor?: ProductoAditamentosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoAditamentosScalarFieldEnum | ProductoAditamentosScalarFieldEnum[]
  }

  /**
   * Aditamento without action
   */
  export type AditamentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aditamento
     */
    select?: AditamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aditamento
     */
    omit?: AditamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AditamentoInclude<ExtArgs> | null
  }


  /**
   * Model ProductoAditamentos
   */

  export type AggregateProductoAditamentos = {
    _count: ProductoAditamentosCountAggregateOutputType | null
    _avg: ProductoAditamentosAvgAggregateOutputType | null
    _sum: ProductoAditamentosSumAggregateOutputType | null
    _min: ProductoAditamentosMinAggregateOutputType | null
    _max: ProductoAditamentosMaxAggregateOutputType | null
  }

  export type ProductoAditamentosAvgAggregateOutputType = {
    id_producto: number | null
    id_aditamento: number | null
  }

  export type ProductoAditamentosSumAggregateOutputType = {
    id_producto: number | null
    id_aditamento: number | null
  }

  export type ProductoAditamentosMinAggregateOutputType = {
    id_producto: number | null
    id_aditamento: number | null
  }

  export type ProductoAditamentosMaxAggregateOutputType = {
    id_producto: number | null
    id_aditamento: number | null
  }

  export type ProductoAditamentosCountAggregateOutputType = {
    id_producto: number
    id_aditamento: number
    _all: number
  }


  export type ProductoAditamentosAvgAggregateInputType = {
    id_producto?: true
    id_aditamento?: true
  }

  export type ProductoAditamentosSumAggregateInputType = {
    id_producto?: true
    id_aditamento?: true
  }

  export type ProductoAditamentosMinAggregateInputType = {
    id_producto?: true
    id_aditamento?: true
  }

  export type ProductoAditamentosMaxAggregateInputType = {
    id_producto?: true
    id_aditamento?: true
  }

  export type ProductoAditamentosCountAggregateInputType = {
    id_producto?: true
    id_aditamento?: true
    _all?: true
  }

  export type ProductoAditamentosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductoAditamentos to aggregate.
     */
    where?: ProductoAditamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoAditamentos to fetch.
     */
    orderBy?: ProductoAditamentosOrderByWithRelationInput | ProductoAditamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductoAditamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoAditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoAditamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductoAditamentos
    **/
    _count?: true | ProductoAditamentosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductoAditamentosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductoAditamentosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductoAditamentosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductoAditamentosMaxAggregateInputType
  }

  export type GetProductoAditamentosAggregateType<T extends ProductoAditamentosAggregateArgs> = {
        [P in keyof T & keyof AggregateProductoAditamentos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductoAditamentos[P]>
      : GetScalarType<T[P], AggregateProductoAditamentos[P]>
  }




  export type ProductoAditamentosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoAditamentosWhereInput
    orderBy?: ProductoAditamentosOrderByWithAggregationInput | ProductoAditamentosOrderByWithAggregationInput[]
    by: ProductoAditamentosScalarFieldEnum[] | ProductoAditamentosScalarFieldEnum
    having?: ProductoAditamentosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductoAditamentosCountAggregateInputType | true
    _avg?: ProductoAditamentosAvgAggregateInputType
    _sum?: ProductoAditamentosSumAggregateInputType
    _min?: ProductoAditamentosMinAggregateInputType
    _max?: ProductoAditamentosMaxAggregateInputType
  }

  export type ProductoAditamentosGroupByOutputType = {
    id_producto: number
    id_aditamento: number
    _count: ProductoAditamentosCountAggregateOutputType | null
    _avg: ProductoAditamentosAvgAggregateOutputType | null
    _sum: ProductoAditamentosSumAggregateOutputType | null
    _min: ProductoAditamentosMinAggregateOutputType | null
    _max: ProductoAditamentosMaxAggregateOutputType | null
  }

  type GetProductoAditamentosGroupByPayload<T extends ProductoAditamentosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductoAditamentosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductoAditamentosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductoAditamentosGroupByOutputType[P]>
            : GetScalarType<T[P], ProductoAditamentosGroupByOutputType[P]>
        }
      >
    >


  export type ProductoAditamentosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_producto?: boolean
    id_aditamento?: boolean
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productoAditamentos"]>

  export type ProductoAditamentosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_producto?: boolean
    id_aditamento?: boolean
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productoAditamentos"]>

  export type ProductoAditamentosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_producto?: boolean
    id_aditamento?: boolean
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productoAditamentos"]>

  export type ProductoAditamentosSelectScalar = {
    id_producto?: boolean
    id_aditamento?: boolean
  }

  export type ProductoAditamentosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_producto" | "id_aditamento", ExtArgs["result"]["productoAditamentos"]>
  export type ProductoAditamentosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type ProductoAditamentosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type ProductoAditamentosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }

  export type $ProductoAditamentosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductoAditamentos"
    objects: {
      aditamento: Prisma.$AditamentoPayload<ExtArgs>
      producto: Prisma.$ProductoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_producto: number
      id_aditamento: number
    }, ExtArgs["result"]["productoAditamentos"]>
    composites: {}
  }

  type ProductoAditamentosGetPayload<S extends boolean | null | undefined | ProductoAditamentosDefaultArgs> = $Result.GetResult<Prisma.$ProductoAditamentosPayload, S>

  type ProductoAditamentosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductoAditamentosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductoAditamentosCountAggregateInputType | true
    }

  export interface ProductoAditamentosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductoAditamentos'], meta: { name: 'ProductoAditamentos' } }
    /**
     * Find zero or one ProductoAditamentos that matches the filter.
     * @param {ProductoAditamentosFindUniqueArgs} args - Arguments to find a ProductoAditamentos
     * @example
     * // Get one ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductoAditamentosFindUniqueArgs>(args: SelectSubset<T, ProductoAditamentosFindUniqueArgs<ExtArgs>>): Prisma__ProductoAditamentosClient<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductoAditamentos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductoAditamentosFindUniqueOrThrowArgs} args - Arguments to find a ProductoAditamentos
     * @example
     * // Get one ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductoAditamentosFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductoAditamentosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductoAditamentosClient<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductoAditamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAditamentosFindFirstArgs} args - Arguments to find a ProductoAditamentos
     * @example
     * // Get one ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductoAditamentosFindFirstArgs>(args?: SelectSubset<T, ProductoAditamentosFindFirstArgs<ExtArgs>>): Prisma__ProductoAditamentosClient<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductoAditamentos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAditamentosFindFirstOrThrowArgs} args - Arguments to find a ProductoAditamentos
     * @example
     * // Get one ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductoAditamentosFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductoAditamentosFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductoAditamentosClient<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductoAditamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAditamentosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.findMany()
     * 
     * // Get first 10 ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.findMany({ take: 10 })
     * 
     * // Only select the `id_producto`
     * const productoAditamentosWithId_productoOnly = await prisma.productoAditamentos.findMany({ select: { id_producto: true } })
     * 
     */
    findMany<T extends ProductoAditamentosFindManyArgs>(args?: SelectSubset<T, ProductoAditamentosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductoAditamentos.
     * @param {ProductoAditamentosCreateArgs} args - Arguments to create a ProductoAditamentos.
     * @example
     * // Create one ProductoAditamentos
     * const ProductoAditamentos = await prisma.productoAditamentos.create({
     *   data: {
     *     // ... data to create a ProductoAditamentos
     *   }
     * })
     * 
     */
    create<T extends ProductoAditamentosCreateArgs>(args: SelectSubset<T, ProductoAditamentosCreateArgs<ExtArgs>>): Prisma__ProductoAditamentosClient<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductoAditamentos.
     * @param {ProductoAditamentosCreateManyArgs} args - Arguments to create many ProductoAditamentos.
     * @example
     * // Create many ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductoAditamentosCreateManyArgs>(args?: SelectSubset<T, ProductoAditamentosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductoAditamentos and returns the data saved in the database.
     * @param {ProductoAditamentosCreateManyAndReturnArgs} args - Arguments to create many ProductoAditamentos.
     * @example
     * // Create many ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductoAditamentos and only return the `id_producto`
     * const productoAditamentosWithId_productoOnly = await prisma.productoAditamentos.createManyAndReturn({
     *   select: { id_producto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductoAditamentosCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductoAditamentosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductoAditamentos.
     * @param {ProductoAditamentosDeleteArgs} args - Arguments to delete one ProductoAditamentos.
     * @example
     * // Delete one ProductoAditamentos
     * const ProductoAditamentos = await prisma.productoAditamentos.delete({
     *   where: {
     *     // ... filter to delete one ProductoAditamentos
     *   }
     * })
     * 
     */
    delete<T extends ProductoAditamentosDeleteArgs>(args: SelectSubset<T, ProductoAditamentosDeleteArgs<ExtArgs>>): Prisma__ProductoAditamentosClient<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductoAditamentos.
     * @param {ProductoAditamentosUpdateArgs} args - Arguments to update one ProductoAditamentos.
     * @example
     * // Update one ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductoAditamentosUpdateArgs>(args: SelectSubset<T, ProductoAditamentosUpdateArgs<ExtArgs>>): Prisma__ProductoAditamentosClient<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductoAditamentos.
     * @param {ProductoAditamentosDeleteManyArgs} args - Arguments to filter ProductoAditamentos to delete.
     * @example
     * // Delete a few ProductoAditamentos
     * const { count } = await prisma.productoAditamentos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductoAditamentosDeleteManyArgs>(args?: SelectSubset<T, ProductoAditamentosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductoAditamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAditamentosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductoAditamentosUpdateManyArgs>(args: SelectSubset<T, ProductoAditamentosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductoAditamentos and returns the data updated in the database.
     * @param {ProductoAditamentosUpdateManyAndReturnArgs} args - Arguments to update many ProductoAditamentos.
     * @example
     * // Update many ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductoAditamentos and only return the `id_producto`
     * const productoAditamentosWithId_productoOnly = await prisma.productoAditamentos.updateManyAndReturn({
     *   select: { id_producto: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductoAditamentosUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductoAditamentosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductoAditamentos.
     * @param {ProductoAditamentosUpsertArgs} args - Arguments to update or create a ProductoAditamentos.
     * @example
     * // Update or create a ProductoAditamentos
     * const productoAditamentos = await prisma.productoAditamentos.upsert({
     *   create: {
     *     // ... data to create a ProductoAditamentos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductoAditamentos we want to update
     *   }
     * })
     */
    upsert<T extends ProductoAditamentosUpsertArgs>(args: SelectSubset<T, ProductoAditamentosUpsertArgs<ExtArgs>>): Prisma__ProductoAditamentosClient<$Result.GetResult<Prisma.$ProductoAditamentosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductoAditamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAditamentosCountArgs} args - Arguments to filter ProductoAditamentos to count.
     * @example
     * // Count the number of ProductoAditamentos
     * const count = await prisma.productoAditamentos.count({
     *   where: {
     *     // ... the filter for the ProductoAditamentos we want to count
     *   }
     * })
    **/
    count<T extends ProductoAditamentosCountArgs>(
      args?: Subset<T, ProductoAditamentosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductoAditamentosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductoAditamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAditamentosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductoAditamentosAggregateArgs>(args: Subset<T, ProductoAditamentosAggregateArgs>): Prisma.PrismaPromise<GetProductoAditamentosAggregateType<T>>

    /**
     * Group by ProductoAditamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAditamentosGroupByArgs} args - Group by arguments.
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
      T extends ProductoAditamentosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductoAditamentosGroupByArgs['orderBy'] }
        : { orderBy?: ProductoAditamentosGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductoAditamentosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductoAditamentosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductoAditamentos model
   */
  readonly fields: ProductoAditamentosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductoAditamentos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductoAditamentosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aditamento<T extends AditamentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AditamentoDefaultArgs<ExtArgs>>): Prisma__AditamentoClient<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProductoAditamentos model
   */
  interface ProductoAditamentosFieldRefs {
    readonly id_producto: FieldRef<"ProductoAditamentos", 'Int'>
    readonly id_aditamento: FieldRef<"ProductoAditamentos", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProductoAditamentos findUnique
   */
  export type ProductoAditamentosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
    /**
     * Filter, which ProductoAditamentos to fetch.
     */
    where: ProductoAditamentosWhereUniqueInput
  }

  /**
   * ProductoAditamentos findUniqueOrThrow
   */
  export type ProductoAditamentosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
    /**
     * Filter, which ProductoAditamentos to fetch.
     */
    where: ProductoAditamentosWhereUniqueInput
  }

  /**
   * ProductoAditamentos findFirst
   */
  export type ProductoAditamentosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
    /**
     * Filter, which ProductoAditamentos to fetch.
     */
    where?: ProductoAditamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoAditamentos to fetch.
     */
    orderBy?: ProductoAditamentosOrderByWithRelationInput | ProductoAditamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductoAditamentos.
     */
    cursor?: ProductoAditamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoAditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoAditamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductoAditamentos.
     */
    distinct?: ProductoAditamentosScalarFieldEnum | ProductoAditamentosScalarFieldEnum[]
  }

  /**
   * ProductoAditamentos findFirstOrThrow
   */
  export type ProductoAditamentosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
    /**
     * Filter, which ProductoAditamentos to fetch.
     */
    where?: ProductoAditamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoAditamentos to fetch.
     */
    orderBy?: ProductoAditamentosOrderByWithRelationInput | ProductoAditamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductoAditamentos.
     */
    cursor?: ProductoAditamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoAditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoAditamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductoAditamentos.
     */
    distinct?: ProductoAditamentosScalarFieldEnum | ProductoAditamentosScalarFieldEnum[]
  }

  /**
   * ProductoAditamentos findMany
   */
  export type ProductoAditamentosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
    /**
     * Filter, which ProductoAditamentos to fetch.
     */
    where?: ProductoAditamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoAditamentos to fetch.
     */
    orderBy?: ProductoAditamentosOrderByWithRelationInput | ProductoAditamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductoAditamentos.
     */
    cursor?: ProductoAditamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoAditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoAditamentos.
     */
    skip?: number
    distinct?: ProductoAditamentosScalarFieldEnum | ProductoAditamentosScalarFieldEnum[]
  }

  /**
   * ProductoAditamentos create
   */
  export type ProductoAditamentosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductoAditamentos.
     */
    data: XOR<ProductoAditamentosCreateInput, ProductoAditamentosUncheckedCreateInput>
  }

  /**
   * ProductoAditamentos createMany
   */
  export type ProductoAditamentosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductoAditamentos.
     */
    data: ProductoAditamentosCreateManyInput | ProductoAditamentosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductoAditamentos createManyAndReturn
   */
  export type ProductoAditamentosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * The data used to create many ProductoAditamentos.
     */
    data: ProductoAditamentosCreateManyInput | ProductoAditamentosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductoAditamentos update
   */
  export type ProductoAditamentosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductoAditamentos.
     */
    data: XOR<ProductoAditamentosUpdateInput, ProductoAditamentosUncheckedUpdateInput>
    /**
     * Choose, which ProductoAditamentos to update.
     */
    where: ProductoAditamentosWhereUniqueInput
  }

  /**
   * ProductoAditamentos updateMany
   */
  export type ProductoAditamentosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductoAditamentos.
     */
    data: XOR<ProductoAditamentosUpdateManyMutationInput, ProductoAditamentosUncheckedUpdateManyInput>
    /**
     * Filter which ProductoAditamentos to update
     */
    where?: ProductoAditamentosWhereInput
    /**
     * Limit how many ProductoAditamentos to update.
     */
    limit?: number
  }

  /**
   * ProductoAditamentos updateManyAndReturn
   */
  export type ProductoAditamentosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * The data used to update ProductoAditamentos.
     */
    data: XOR<ProductoAditamentosUpdateManyMutationInput, ProductoAditamentosUncheckedUpdateManyInput>
    /**
     * Filter which ProductoAditamentos to update
     */
    where?: ProductoAditamentosWhereInput
    /**
     * Limit how many ProductoAditamentos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductoAditamentos upsert
   */
  export type ProductoAditamentosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductoAditamentos to update in case it exists.
     */
    where: ProductoAditamentosWhereUniqueInput
    /**
     * In case the ProductoAditamentos found by the `where` argument doesn't exist, create a new ProductoAditamentos with this data.
     */
    create: XOR<ProductoAditamentosCreateInput, ProductoAditamentosUncheckedCreateInput>
    /**
     * In case the ProductoAditamentos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductoAditamentosUpdateInput, ProductoAditamentosUncheckedUpdateInput>
  }

  /**
   * ProductoAditamentos delete
   */
  export type ProductoAditamentosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
    /**
     * Filter which ProductoAditamentos to delete.
     */
    where: ProductoAditamentosWhereUniqueInput
  }

  /**
   * ProductoAditamentos deleteMany
   */
  export type ProductoAditamentosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductoAditamentos to delete
     */
    where?: ProductoAditamentosWhereInput
    /**
     * Limit how many ProductoAditamentos to delete.
     */
    limit?: number
  }

  /**
   * ProductoAditamentos without action
   */
  export type ProductoAditamentosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoAditamentos
     */
    select?: ProductoAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoAditamentos
     */
    omit?: ProductoAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoAditamentosInclude<ExtArgs> | null
  }


  /**
   * Model Comandas
   */

  export type AggregateComandas = {
    _count: ComandasCountAggregateOutputType | null
    _avg: ComandasAvgAggregateOutputType | null
    _sum: ComandasSumAggregateOutputType | null
    _min: ComandasMinAggregateOutputType | null
    _max: ComandasMaxAggregateOutputType | null
  }

  export type ComandasAvgAggregateOutputType = {
    id_comanda: number | null
    id_mesa: number | null
    id_mesero: number | null
    impuestos: number | null
    sub_total: number | null
    total: number | null
  }

  export type ComandasSumAggregateOutputType = {
    id_comanda: number | null
    id_mesa: number | null
    id_mesero: number | null
    impuestos: number | null
    sub_total: number | null
    total: number | null
  }

  export type ComandasMinAggregateOutputType = {
    id_comanda: number | null
    id_mesa: number | null
    id_mesero: number | null
    fecha_hora: Date | null
    estado: string | null
    token: string | null
    fecha_pagado: Date | null
    impuestos: number | null
    pagado: boolean | null
    sub_total: number | null
    total: number | null
    transaccion_id: string | null
    metodo_pago: string | null
  }

  export type ComandasMaxAggregateOutputType = {
    id_comanda: number | null
    id_mesa: number | null
    id_mesero: number | null
    fecha_hora: Date | null
    estado: string | null
    token: string | null
    fecha_pagado: Date | null
    impuestos: number | null
    pagado: boolean | null
    sub_total: number | null
    total: number | null
    transaccion_id: string | null
    metodo_pago: string | null
  }

  export type ComandasCountAggregateOutputType = {
    id_comanda: number
    id_mesa: number
    id_mesero: number
    fecha_hora: number
    estado: number
    token: number
    fecha_pagado: number
    impuestos: number
    pagado: number
    sub_total: number
    total: number
    transaccion_id: number
    metodo_pago: number
    _all: number
  }


  export type ComandasAvgAggregateInputType = {
    id_comanda?: true
    id_mesa?: true
    id_mesero?: true
    impuestos?: true
    sub_total?: true
    total?: true
  }

  export type ComandasSumAggregateInputType = {
    id_comanda?: true
    id_mesa?: true
    id_mesero?: true
    impuestos?: true
    sub_total?: true
    total?: true
  }

  export type ComandasMinAggregateInputType = {
    id_comanda?: true
    id_mesa?: true
    id_mesero?: true
    fecha_hora?: true
    estado?: true
    token?: true
    fecha_pagado?: true
    impuestos?: true
    pagado?: true
    sub_total?: true
    total?: true
    transaccion_id?: true
    metodo_pago?: true
  }

  export type ComandasMaxAggregateInputType = {
    id_comanda?: true
    id_mesa?: true
    id_mesero?: true
    fecha_hora?: true
    estado?: true
    token?: true
    fecha_pagado?: true
    impuestos?: true
    pagado?: true
    sub_total?: true
    total?: true
    transaccion_id?: true
    metodo_pago?: true
  }

  export type ComandasCountAggregateInputType = {
    id_comanda?: true
    id_mesa?: true
    id_mesero?: true
    fecha_hora?: true
    estado?: true
    token?: true
    fecha_pagado?: true
    impuestos?: true
    pagado?: true
    sub_total?: true
    total?: true
    transaccion_id?: true
    metodo_pago?: true
    _all?: true
  }

  export type ComandasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comandas to aggregate.
     */
    where?: ComandasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comandas to fetch.
     */
    orderBy?: ComandasOrderByWithRelationInput | ComandasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComandasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comandas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comandas
    **/
    _count?: true | ComandasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComandasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComandasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComandasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComandasMaxAggregateInputType
  }

  export type GetComandasAggregateType<T extends ComandasAggregateArgs> = {
        [P in keyof T & keyof AggregateComandas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComandas[P]>
      : GetScalarType<T[P], AggregateComandas[P]>
  }




  export type ComandasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComandasWhereInput
    orderBy?: ComandasOrderByWithAggregationInput | ComandasOrderByWithAggregationInput[]
    by: ComandasScalarFieldEnum[] | ComandasScalarFieldEnum
    having?: ComandasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComandasCountAggregateInputType | true
    _avg?: ComandasAvgAggregateInputType
    _sum?: ComandasSumAggregateInputType
    _min?: ComandasMinAggregateInputType
    _max?: ComandasMaxAggregateInputType
  }

  export type ComandasGroupByOutputType = {
    id_comanda: number
    id_mesa: number
    id_mesero: number
    fecha_hora: Date | null
    estado: string
    token: string | null
    fecha_pagado: Date | null
    impuestos: number
    pagado: boolean
    sub_total: number
    total: number
    transaccion_id: string | null
    metodo_pago: string | null
    _count: ComandasCountAggregateOutputType | null
    _avg: ComandasAvgAggregateOutputType | null
    _sum: ComandasSumAggregateOutputType | null
    _min: ComandasMinAggregateOutputType | null
    _max: ComandasMaxAggregateOutputType | null
  }

  type GetComandasGroupByPayload<T extends ComandasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComandasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComandasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComandasGroupByOutputType[P]>
            : GetScalarType<T[P], ComandasGroupByOutputType[P]>
        }
      >
    >


  export type ComandasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_comanda?: boolean
    id_mesa?: boolean
    id_mesero?: boolean
    fecha_hora?: boolean
    estado?: boolean
    token?: boolean
    fecha_pagado?: boolean
    impuestos?: boolean
    pagado?: boolean
    sub_total?: boolean
    total?: boolean
    transaccion_id?: boolean
    metodo_pago?: boolean
    mesa?: boolean | MesaDefaultArgs<ExtArgs>
    mesero?: boolean | MeseroDefaultArgs<ExtArgs>
    detalles?: boolean | Comandas$detallesArgs<ExtArgs>
    _count?: boolean | ComandasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comandas"]>

  export type ComandasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_comanda?: boolean
    id_mesa?: boolean
    id_mesero?: boolean
    fecha_hora?: boolean
    estado?: boolean
    token?: boolean
    fecha_pagado?: boolean
    impuestos?: boolean
    pagado?: boolean
    sub_total?: boolean
    total?: boolean
    transaccion_id?: boolean
    metodo_pago?: boolean
    mesa?: boolean | MesaDefaultArgs<ExtArgs>
    mesero?: boolean | MeseroDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comandas"]>

  export type ComandasSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_comanda?: boolean
    id_mesa?: boolean
    id_mesero?: boolean
    fecha_hora?: boolean
    estado?: boolean
    token?: boolean
    fecha_pagado?: boolean
    impuestos?: boolean
    pagado?: boolean
    sub_total?: boolean
    total?: boolean
    transaccion_id?: boolean
    metodo_pago?: boolean
    mesa?: boolean | MesaDefaultArgs<ExtArgs>
    mesero?: boolean | MeseroDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comandas"]>

  export type ComandasSelectScalar = {
    id_comanda?: boolean
    id_mesa?: boolean
    id_mesero?: boolean
    fecha_hora?: boolean
    estado?: boolean
    token?: boolean
    fecha_pagado?: boolean
    impuestos?: boolean
    pagado?: boolean
    sub_total?: boolean
    total?: boolean
    transaccion_id?: boolean
    metodo_pago?: boolean
  }

  export type ComandasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_comanda" | "id_mesa" | "id_mesero" | "fecha_hora" | "estado" | "token" | "fecha_pagado" | "impuestos" | "pagado" | "sub_total" | "total" | "transaccion_id" | "metodo_pago", ExtArgs["result"]["comandas"]>
  export type ComandasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mesa?: boolean | MesaDefaultArgs<ExtArgs>
    mesero?: boolean | MeseroDefaultArgs<ExtArgs>
    detalles?: boolean | Comandas$detallesArgs<ExtArgs>
    _count?: boolean | ComandasCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ComandasIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mesa?: boolean | MesaDefaultArgs<ExtArgs>
    mesero?: boolean | MeseroDefaultArgs<ExtArgs>
  }
  export type ComandasIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mesa?: boolean | MesaDefaultArgs<ExtArgs>
    mesero?: boolean | MeseroDefaultArgs<ExtArgs>
  }

  export type $ComandasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comandas"
    objects: {
      mesa: Prisma.$MesaPayload<ExtArgs>
      mesero: Prisma.$MeseroPayload<ExtArgs>
      detalles: Prisma.$DetalleComandaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_comanda: number
      id_mesa: number
      id_mesero: number
      fecha_hora: Date | null
      estado: string
      token: string | null
      fecha_pagado: Date | null
      impuestos: number
      pagado: boolean
      sub_total: number
      total: number
      transaccion_id: string | null
      metodo_pago: string | null
    }, ExtArgs["result"]["comandas"]>
    composites: {}
  }

  type ComandasGetPayload<S extends boolean | null | undefined | ComandasDefaultArgs> = $Result.GetResult<Prisma.$ComandasPayload, S>

  type ComandasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComandasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComandasCountAggregateInputType | true
    }

  export interface ComandasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comandas'], meta: { name: 'Comandas' } }
    /**
     * Find zero or one Comandas that matches the filter.
     * @param {ComandasFindUniqueArgs} args - Arguments to find a Comandas
     * @example
     * // Get one Comandas
     * const comandas = await prisma.comandas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComandasFindUniqueArgs>(args: SelectSubset<T, ComandasFindUniqueArgs<ExtArgs>>): Prisma__ComandasClient<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comandas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComandasFindUniqueOrThrowArgs} args - Arguments to find a Comandas
     * @example
     * // Get one Comandas
     * const comandas = await prisma.comandas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComandasFindUniqueOrThrowArgs>(args: SelectSubset<T, ComandasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComandasClient<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comandas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandasFindFirstArgs} args - Arguments to find a Comandas
     * @example
     * // Get one Comandas
     * const comandas = await prisma.comandas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComandasFindFirstArgs>(args?: SelectSubset<T, ComandasFindFirstArgs<ExtArgs>>): Prisma__ComandasClient<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comandas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandasFindFirstOrThrowArgs} args - Arguments to find a Comandas
     * @example
     * // Get one Comandas
     * const comandas = await prisma.comandas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComandasFindFirstOrThrowArgs>(args?: SelectSubset<T, ComandasFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComandasClient<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comandas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comandas
     * const comandas = await prisma.comandas.findMany()
     * 
     * // Get first 10 Comandas
     * const comandas = await prisma.comandas.findMany({ take: 10 })
     * 
     * // Only select the `id_comanda`
     * const comandasWithId_comandaOnly = await prisma.comandas.findMany({ select: { id_comanda: true } })
     * 
     */
    findMany<T extends ComandasFindManyArgs>(args?: SelectSubset<T, ComandasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comandas.
     * @param {ComandasCreateArgs} args - Arguments to create a Comandas.
     * @example
     * // Create one Comandas
     * const Comandas = await prisma.comandas.create({
     *   data: {
     *     // ... data to create a Comandas
     *   }
     * })
     * 
     */
    create<T extends ComandasCreateArgs>(args: SelectSubset<T, ComandasCreateArgs<ExtArgs>>): Prisma__ComandasClient<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comandas.
     * @param {ComandasCreateManyArgs} args - Arguments to create many Comandas.
     * @example
     * // Create many Comandas
     * const comandas = await prisma.comandas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComandasCreateManyArgs>(args?: SelectSubset<T, ComandasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comandas and returns the data saved in the database.
     * @param {ComandasCreateManyAndReturnArgs} args - Arguments to create many Comandas.
     * @example
     * // Create many Comandas
     * const comandas = await prisma.comandas.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comandas and only return the `id_comanda`
     * const comandasWithId_comandaOnly = await prisma.comandas.createManyAndReturn({
     *   select: { id_comanda: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComandasCreateManyAndReturnArgs>(args?: SelectSubset<T, ComandasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comandas.
     * @param {ComandasDeleteArgs} args - Arguments to delete one Comandas.
     * @example
     * // Delete one Comandas
     * const Comandas = await prisma.comandas.delete({
     *   where: {
     *     // ... filter to delete one Comandas
     *   }
     * })
     * 
     */
    delete<T extends ComandasDeleteArgs>(args: SelectSubset<T, ComandasDeleteArgs<ExtArgs>>): Prisma__ComandasClient<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comandas.
     * @param {ComandasUpdateArgs} args - Arguments to update one Comandas.
     * @example
     * // Update one Comandas
     * const comandas = await prisma.comandas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComandasUpdateArgs>(args: SelectSubset<T, ComandasUpdateArgs<ExtArgs>>): Prisma__ComandasClient<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comandas.
     * @param {ComandasDeleteManyArgs} args - Arguments to filter Comandas to delete.
     * @example
     * // Delete a few Comandas
     * const { count } = await prisma.comandas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComandasDeleteManyArgs>(args?: SelectSubset<T, ComandasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comandas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comandas
     * const comandas = await prisma.comandas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComandasUpdateManyArgs>(args: SelectSubset<T, ComandasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comandas and returns the data updated in the database.
     * @param {ComandasUpdateManyAndReturnArgs} args - Arguments to update many Comandas.
     * @example
     * // Update many Comandas
     * const comandas = await prisma.comandas.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comandas and only return the `id_comanda`
     * const comandasWithId_comandaOnly = await prisma.comandas.updateManyAndReturn({
     *   select: { id_comanda: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComandasUpdateManyAndReturnArgs>(args: SelectSubset<T, ComandasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comandas.
     * @param {ComandasUpsertArgs} args - Arguments to update or create a Comandas.
     * @example
     * // Update or create a Comandas
     * const comandas = await prisma.comandas.upsert({
     *   create: {
     *     // ... data to create a Comandas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comandas we want to update
     *   }
     * })
     */
    upsert<T extends ComandasUpsertArgs>(args: SelectSubset<T, ComandasUpsertArgs<ExtArgs>>): Prisma__ComandasClient<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comandas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandasCountArgs} args - Arguments to filter Comandas to count.
     * @example
     * // Count the number of Comandas
     * const count = await prisma.comandas.count({
     *   where: {
     *     // ... the filter for the Comandas we want to count
     *   }
     * })
    **/
    count<T extends ComandasCountArgs>(
      args?: Subset<T, ComandasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComandasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comandas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ComandasAggregateArgs>(args: Subset<T, ComandasAggregateArgs>): Prisma.PrismaPromise<GetComandasAggregateType<T>>

    /**
     * Group by Comandas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandasGroupByArgs} args - Group by arguments.
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
      T extends ComandasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComandasGroupByArgs['orderBy'] }
        : { orderBy?: ComandasGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ComandasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComandasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comandas model
   */
  readonly fields: ComandasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comandas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComandasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mesa<T extends MesaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MesaDefaultArgs<ExtArgs>>): Prisma__MesaClient<$Result.GetResult<Prisma.$MesaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mesero<T extends MeseroDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MeseroDefaultArgs<ExtArgs>>): Prisma__MeseroClient<$Result.GetResult<Prisma.$MeseroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    detalles<T extends Comandas$detallesArgs<ExtArgs> = {}>(args?: Subset<T, Comandas$detallesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Comandas model
   */
  interface ComandasFieldRefs {
    readonly id_comanda: FieldRef<"Comandas", 'Int'>
    readonly id_mesa: FieldRef<"Comandas", 'Int'>
    readonly id_mesero: FieldRef<"Comandas", 'Int'>
    readonly fecha_hora: FieldRef<"Comandas", 'DateTime'>
    readonly estado: FieldRef<"Comandas", 'String'>
    readonly token: FieldRef<"Comandas", 'String'>
    readonly fecha_pagado: FieldRef<"Comandas", 'DateTime'>
    readonly impuestos: FieldRef<"Comandas", 'Float'>
    readonly pagado: FieldRef<"Comandas", 'Boolean'>
    readonly sub_total: FieldRef<"Comandas", 'Float'>
    readonly total: FieldRef<"Comandas", 'Float'>
    readonly transaccion_id: FieldRef<"Comandas", 'String'>
    readonly metodo_pago: FieldRef<"Comandas", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Comandas findUnique
   */
  export type ComandasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
    /**
     * Filter, which Comandas to fetch.
     */
    where: ComandasWhereUniqueInput
  }

  /**
   * Comandas findUniqueOrThrow
   */
  export type ComandasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
    /**
     * Filter, which Comandas to fetch.
     */
    where: ComandasWhereUniqueInput
  }

  /**
   * Comandas findFirst
   */
  export type ComandasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
    /**
     * Filter, which Comandas to fetch.
     */
    where?: ComandasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comandas to fetch.
     */
    orderBy?: ComandasOrderByWithRelationInput | ComandasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comandas.
     */
    cursor?: ComandasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comandas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comandas.
     */
    distinct?: ComandasScalarFieldEnum | ComandasScalarFieldEnum[]
  }

  /**
   * Comandas findFirstOrThrow
   */
  export type ComandasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
    /**
     * Filter, which Comandas to fetch.
     */
    where?: ComandasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comandas to fetch.
     */
    orderBy?: ComandasOrderByWithRelationInput | ComandasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comandas.
     */
    cursor?: ComandasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comandas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comandas.
     */
    distinct?: ComandasScalarFieldEnum | ComandasScalarFieldEnum[]
  }

  /**
   * Comandas findMany
   */
  export type ComandasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
    /**
     * Filter, which Comandas to fetch.
     */
    where?: ComandasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comandas to fetch.
     */
    orderBy?: ComandasOrderByWithRelationInput | ComandasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comandas.
     */
    cursor?: ComandasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comandas.
     */
    skip?: number
    distinct?: ComandasScalarFieldEnum | ComandasScalarFieldEnum[]
  }

  /**
   * Comandas create
   */
  export type ComandasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
    /**
     * The data needed to create a Comandas.
     */
    data: XOR<ComandasCreateInput, ComandasUncheckedCreateInput>
  }

  /**
   * Comandas createMany
   */
  export type ComandasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comandas.
     */
    data: ComandasCreateManyInput | ComandasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comandas createManyAndReturn
   */
  export type ComandasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * The data used to create many Comandas.
     */
    data: ComandasCreateManyInput | ComandasCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comandas update
   */
  export type ComandasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
    /**
     * The data needed to update a Comandas.
     */
    data: XOR<ComandasUpdateInput, ComandasUncheckedUpdateInput>
    /**
     * Choose, which Comandas to update.
     */
    where: ComandasWhereUniqueInput
  }

  /**
   * Comandas updateMany
   */
  export type ComandasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comandas.
     */
    data: XOR<ComandasUpdateManyMutationInput, ComandasUncheckedUpdateManyInput>
    /**
     * Filter which Comandas to update
     */
    where?: ComandasWhereInput
    /**
     * Limit how many Comandas to update.
     */
    limit?: number
  }

  /**
   * Comandas updateManyAndReturn
   */
  export type ComandasUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * The data used to update Comandas.
     */
    data: XOR<ComandasUpdateManyMutationInput, ComandasUncheckedUpdateManyInput>
    /**
     * Filter which Comandas to update
     */
    where?: ComandasWhereInput
    /**
     * Limit how many Comandas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comandas upsert
   */
  export type ComandasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
    /**
     * The filter to search for the Comandas to update in case it exists.
     */
    where: ComandasWhereUniqueInput
    /**
     * In case the Comandas found by the `where` argument doesn't exist, create a new Comandas with this data.
     */
    create: XOR<ComandasCreateInput, ComandasUncheckedCreateInput>
    /**
     * In case the Comandas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComandasUpdateInput, ComandasUncheckedUpdateInput>
  }

  /**
   * Comandas delete
   */
  export type ComandasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
    /**
     * Filter which Comandas to delete.
     */
    where: ComandasWhereUniqueInput
  }

  /**
   * Comandas deleteMany
   */
  export type ComandasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comandas to delete
     */
    where?: ComandasWhereInput
    /**
     * Limit how many Comandas to delete.
     */
    limit?: number
  }

  /**
   * Comandas.detalles
   */
  export type Comandas$detallesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
    where?: DetalleComandaWhereInput
    orderBy?: DetalleComandaOrderByWithRelationInput | DetalleComandaOrderByWithRelationInput[]
    cursor?: DetalleComandaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DetalleComandaScalarFieldEnum | DetalleComandaScalarFieldEnum[]
  }

  /**
   * Comandas without action
   */
  export type ComandasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comandas
     */
    select?: ComandasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comandas
     */
    omit?: ComandasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandasInclude<ExtArgs> | null
  }


  /**
   * Model DetalleComanda
   */

  export type AggregateDetalleComanda = {
    _count: DetalleComandaCountAggregateOutputType | null
    _avg: DetalleComandaAvgAggregateOutputType | null
    _sum: DetalleComandaSumAggregateOutputType | null
    _min: DetalleComandaMinAggregateOutputType | null
    _max: DetalleComandaMaxAggregateOutputType | null
  }

  export type DetalleComandaAvgAggregateOutputType = {
    id_detalle: number | null
    id_comanda: number | null
    id_producto: number | null
    cantidad: number | null
    hora: number | null
  }

  export type DetalleComandaSumAggregateOutputType = {
    id_detalle: number | null
    id_comanda: number | null
    id_producto: number | null
    cantidad: number | null
    hora: number | null
  }

  export type DetalleComandaMinAggregateOutputType = {
    id_detalle: number | null
    id_comanda: number | null
    id_producto: number | null
    cantidad: number | null
    notas_especiales: string | null
    status: string | null
    hora: number | null
  }

  export type DetalleComandaMaxAggregateOutputType = {
    id_detalle: number | null
    id_comanda: number | null
    id_producto: number | null
    cantidad: number | null
    notas_especiales: string | null
    status: string | null
    hora: number | null
  }

  export type DetalleComandaCountAggregateOutputType = {
    id_detalle: number
    id_comanda: number
    id_producto: number
    cantidad: number
    notas_especiales: number
    status: number
    hora: number
    _all: number
  }


  export type DetalleComandaAvgAggregateInputType = {
    id_detalle?: true
    id_comanda?: true
    id_producto?: true
    cantidad?: true
    hora?: true
  }

  export type DetalleComandaSumAggregateInputType = {
    id_detalle?: true
    id_comanda?: true
    id_producto?: true
    cantidad?: true
    hora?: true
  }

  export type DetalleComandaMinAggregateInputType = {
    id_detalle?: true
    id_comanda?: true
    id_producto?: true
    cantidad?: true
    notas_especiales?: true
    status?: true
    hora?: true
  }

  export type DetalleComandaMaxAggregateInputType = {
    id_detalle?: true
    id_comanda?: true
    id_producto?: true
    cantidad?: true
    notas_especiales?: true
    status?: true
    hora?: true
  }

  export type DetalleComandaCountAggregateInputType = {
    id_detalle?: true
    id_comanda?: true
    id_producto?: true
    cantidad?: true
    notas_especiales?: true
    status?: true
    hora?: true
    _all?: true
  }

  export type DetalleComandaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DetalleComanda to aggregate.
     */
    where?: DetalleComandaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleComandas to fetch.
     */
    orderBy?: DetalleComandaOrderByWithRelationInput | DetalleComandaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DetalleComandaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleComandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleComandas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DetalleComandas
    **/
    _count?: true | DetalleComandaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DetalleComandaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DetalleComandaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DetalleComandaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DetalleComandaMaxAggregateInputType
  }

  export type GetDetalleComandaAggregateType<T extends DetalleComandaAggregateArgs> = {
        [P in keyof T & keyof AggregateDetalleComanda]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDetalleComanda[P]>
      : GetScalarType<T[P], AggregateDetalleComanda[P]>
  }




  export type DetalleComandaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DetalleComandaWhereInput
    orderBy?: DetalleComandaOrderByWithAggregationInput | DetalleComandaOrderByWithAggregationInput[]
    by: DetalleComandaScalarFieldEnum[] | DetalleComandaScalarFieldEnum
    having?: DetalleComandaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DetalleComandaCountAggregateInputType | true
    _avg?: DetalleComandaAvgAggregateInputType
    _sum?: DetalleComandaSumAggregateInputType
    _min?: DetalleComandaMinAggregateInputType
    _max?: DetalleComandaMaxAggregateInputType
  }

  export type DetalleComandaGroupByOutputType = {
    id_detalle: number
    id_comanda: number
    id_producto: number
    cantidad: number
    notas_especiales: string | null
    status: string
    hora: number | null
    _count: DetalleComandaCountAggregateOutputType | null
    _avg: DetalleComandaAvgAggregateOutputType | null
    _sum: DetalleComandaSumAggregateOutputType | null
    _min: DetalleComandaMinAggregateOutputType | null
    _max: DetalleComandaMaxAggregateOutputType | null
  }

  type GetDetalleComandaGroupByPayload<T extends DetalleComandaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DetalleComandaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DetalleComandaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DetalleComandaGroupByOutputType[P]>
            : GetScalarType<T[P], DetalleComandaGroupByOutputType[P]>
        }
      >
    >


  export type DetalleComandaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_detalle?: boolean
    id_comanda?: boolean
    id_producto?: boolean
    cantidad?: boolean
    notas_especiales?: boolean
    status?: boolean
    hora?: boolean
    aditamentos?: boolean | DetalleComanda$aditamentosArgs<ExtArgs>
    comanda?: boolean | ComandasDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    _count?: boolean | DetalleComandaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["detalleComanda"]>

  export type DetalleComandaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_detalle?: boolean
    id_comanda?: boolean
    id_producto?: boolean
    cantidad?: boolean
    notas_especiales?: boolean
    status?: boolean
    hora?: boolean
    comanda?: boolean | ComandasDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["detalleComanda"]>

  export type DetalleComandaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_detalle?: boolean
    id_comanda?: boolean
    id_producto?: boolean
    cantidad?: boolean
    notas_especiales?: boolean
    status?: boolean
    hora?: boolean
    comanda?: boolean | ComandasDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["detalleComanda"]>

  export type DetalleComandaSelectScalar = {
    id_detalle?: boolean
    id_comanda?: boolean
    id_producto?: boolean
    cantidad?: boolean
    notas_especiales?: boolean
    status?: boolean
    hora?: boolean
  }

  export type DetalleComandaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_detalle" | "id_comanda" | "id_producto" | "cantidad" | "notas_especiales" | "status" | "hora", ExtArgs["result"]["detalleComanda"]>
  export type DetalleComandaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aditamentos?: boolean | DetalleComanda$aditamentosArgs<ExtArgs>
    comanda?: boolean | ComandasDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    _count?: boolean | DetalleComandaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DetalleComandaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comanda?: boolean | ComandasDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type DetalleComandaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comanda?: boolean | ComandasDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }

  export type $DetalleComandaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DetalleComanda"
    objects: {
      aditamentos: Prisma.$ComandaAditamentosPayload<ExtArgs>[]
      comanda: Prisma.$ComandasPayload<ExtArgs>
      producto: Prisma.$ProductoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_detalle: number
      id_comanda: number
      id_producto: number
      cantidad: number
      notas_especiales: string | null
      status: string
      hora: number | null
    }, ExtArgs["result"]["detalleComanda"]>
    composites: {}
  }

  type DetalleComandaGetPayload<S extends boolean | null | undefined | DetalleComandaDefaultArgs> = $Result.GetResult<Prisma.$DetalleComandaPayload, S>

  type DetalleComandaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DetalleComandaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DetalleComandaCountAggregateInputType | true
    }

  export interface DetalleComandaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DetalleComanda'], meta: { name: 'DetalleComanda' } }
    /**
     * Find zero or one DetalleComanda that matches the filter.
     * @param {DetalleComandaFindUniqueArgs} args - Arguments to find a DetalleComanda
     * @example
     * // Get one DetalleComanda
     * const detalleComanda = await prisma.detalleComanda.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DetalleComandaFindUniqueArgs>(args: SelectSubset<T, DetalleComandaFindUniqueArgs<ExtArgs>>): Prisma__DetalleComandaClient<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DetalleComanda that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DetalleComandaFindUniqueOrThrowArgs} args - Arguments to find a DetalleComanda
     * @example
     * // Get one DetalleComanda
     * const detalleComanda = await prisma.detalleComanda.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DetalleComandaFindUniqueOrThrowArgs>(args: SelectSubset<T, DetalleComandaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DetalleComandaClient<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DetalleComanda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleComandaFindFirstArgs} args - Arguments to find a DetalleComanda
     * @example
     * // Get one DetalleComanda
     * const detalleComanda = await prisma.detalleComanda.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DetalleComandaFindFirstArgs>(args?: SelectSubset<T, DetalleComandaFindFirstArgs<ExtArgs>>): Prisma__DetalleComandaClient<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DetalleComanda that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleComandaFindFirstOrThrowArgs} args - Arguments to find a DetalleComanda
     * @example
     * // Get one DetalleComanda
     * const detalleComanda = await prisma.detalleComanda.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DetalleComandaFindFirstOrThrowArgs>(args?: SelectSubset<T, DetalleComandaFindFirstOrThrowArgs<ExtArgs>>): Prisma__DetalleComandaClient<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DetalleComandas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleComandaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DetalleComandas
     * const detalleComandas = await prisma.detalleComanda.findMany()
     * 
     * // Get first 10 DetalleComandas
     * const detalleComandas = await prisma.detalleComanda.findMany({ take: 10 })
     * 
     * // Only select the `id_detalle`
     * const detalleComandaWithId_detalleOnly = await prisma.detalleComanda.findMany({ select: { id_detalle: true } })
     * 
     */
    findMany<T extends DetalleComandaFindManyArgs>(args?: SelectSubset<T, DetalleComandaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DetalleComanda.
     * @param {DetalleComandaCreateArgs} args - Arguments to create a DetalleComanda.
     * @example
     * // Create one DetalleComanda
     * const DetalleComanda = await prisma.detalleComanda.create({
     *   data: {
     *     // ... data to create a DetalleComanda
     *   }
     * })
     * 
     */
    create<T extends DetalleComandaCreateArgs>(args: SelectSubset<T, DetalleComandaCreateArgs<ExtArgs>>): Prisma__DetalleComandaClient<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DetalleComandas.
     * @param {DetalleComandaCreateManyArgs} args - Arguments to create many DetalleComandas.
     * @example
     * // Create many DetalleComandas
     * const detalleComanda = await prisma.detalleComanda.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DetalleComandaCreateManyArgs>(args?: SelectSubset<T, DetalleComandaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DetalleComandas and returns the data saved in the database.
     * @param {DetalleComandaCreateManyAndReturnArgs} args - Arguments to create many DetalleComandas.
     * @example
     * // Create many DetalleComandas
     * const detalleComanda = await prisma.detalleComanda.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DetalleComandas and only return the `id_detalle`
     * const detalleComandaWithId_detalleOnly = await prisma.detalleComanda.createManyAndReturn({
     *   select: { id_detalle: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DetalleComandaCreateManyAndReturnArgs>(args?: SelectSubset<T, DetalleComandaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DetalleComanda.
     * @param {DetalleComandaDeleteArgs} args - Arguments to delete one DetalleComanda.
     * @example
     * // Delete one DetalleComanda
     * const DetalleComanda = await prisma.detalleComanda.delete({
     *   where: {
     *     // ... filter to delete one DetalleComanda
     *   }
     * })
     * 
     */
    delete<T extends DetalleComandaDeleteArgs>(args: SelectSubset<T, DetalleComandaDeleteArgs<ExtArgs>>): Prisma__DetalleComandaClient<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DetalleComanda.
     * @param {DetalleComandaUpdateArgs} args - Arguments to update one DetalleComanda.
     * @example
     * // Update one DetalleComanda
     * const detalleComanda = await prisma.detalleComanda.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DetalleComandaUpdateArgs>(args: SelectSubset<T, DetalleComandaUpdateArgs<ExtArgs>>): Prisma__DetalleComandaClient<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DetalleComandas.
     * @param {DetalleComandaDeleteManyArgs} args - Arguments to filter DetalleComandas to delete.
     * @example
     * // Delete a few DetalleComandas
     * const { count } = await prisma.detalleComanda.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DetalleComandaDeleteManyArgs>(args?: SelectSubset<T, DetalleComandaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DetalleComandas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleComandaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DetalleComandas
     * const detalleComanda = await prisma.detalleComanda.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DetalleComandaUpdateManyArgs>(args: SelectSubset<T, DetalleComandaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DetalleComandas and returns the data updated in the database.
     * @param {DetalleComandaUpdateManyAndReturnArgs} args - Arguments to update many DetalleComandas.
     * @example
     * // Update many DetalleComandas
     * const detalleComanda = await prisma.detalleComanda.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DetalleComandas and only return the `id_detalle`
     * const detalleComandaWithId_detalleOnly = await prisma.detalleComanda.updateManyAndReturn({
     *   select: { id_detalle: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DetalleComandaUpdateManyAndReturnArgs>(args: SelectSubset<T, DetalleComandaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DetalleComanda.
     * @param {DetalleComandaUpsertArgs} args - Arguments to update or create a DetalleComanda.
     * @example
     * // Update or create a DetalleComanda
     * const detalleComanda = await prisma.detalleComanda.upsert({
     *   create: {
     *     // ... data to create a DetalleComanda
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DetalleComanda we want to update
     *   }
     * })
     */
    upsert<T extends DetalleComandaUpsertArgs>(args: SelectSubset<T, DetalleComandaUpsertArgs<ExtArgs>>): Prisma__DetalleComandaClient<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DetalleComandas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleComandaCountArgs} args - Arguments to filter DetalleComandas to count.
     * @example
     * // Count the number of DetalleComandas
     * const count = await prisma.detalleComanda.count({
     *   where: {
     *     // ... the filter for the DetalleComandas we want to count
     *   }
     * })
    **/
    count<T extends DetalleComandaCountArgs>(
      args?: Subset<T, DetalleComandaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DetalleComandaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DetalleComanda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleComandaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DetalleComandaAggregateArgs>(args: Subset<T, DetalleComandaAggregateArgs>): Prisma.PrismaPromise<GetDetalleComandaAggregateType<T>>

    /**
     * Group by DetalleComanda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DetalleComandaGroupByArgs} args - Group by arguments.
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
      T extends DetalleComandaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DetalleComandaGroupByArgs['orderBy'] }
        : { orderBy?: DetalleComandaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DetalleComandaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDetalleComandaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DetalleComanda model
   */
  readonly fields: DetalleComandaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DetalleComanda.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DetalleComandaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aditamentos<T extends DetalleComanda$aditamentosArgs<ExtArgs> = {}>(args?: Subset<T, DetalleComanda$aditamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comanda<T extends ComandasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComandasDefaultArgs<ExtArgs>>): Prisma__ComandasClient<$Result.GetResult<Prisma.$ComandasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DetalleComanda model
   */
  interface DetalleComandaFieldRefs {
    readonly id_detalle: FieldRef<"DetalleComanda", 'Int'>
    readonly id_comanda: FieldRef<"DetalleComanda", 'Int'>
    readonly id_producto: FieldRef<"DetalleComanda", 'Int'>
    readonly cantidad: FieldRef<"DetalleComanda", 'Int'>
    readonly notas_especiales: FieldRef<"DetalleComanda", 'String'>
    readonly status: FieldRef<"DetalleComanda", 'String'>
    readonly hora: FieldRef<"DetalleComanda", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DetalleComanda findUnique
   */
  export type DetalleComandaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
    /**
     * Filter, which DetalleComanda to fetch.
     */
    where: DetalleComandaWhereUniqueInput
  }

  /**
   * DetalleComanda findUniqueOrThrow
   */
  export type DetalleComandaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
    /**
     * Filter, which DetalleComanda to fetch.
     */
    where: DetalleComandaWhereUniqueInput
  }

  /**
   * DetalleComanda findFirst
   */
  export type DetalleComandaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
    /**
     * Filter, which DetalleComanda to fetch.
     */
    where?: DetalleComandaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleComandas to fetch.
     */
    orderBy?: DetalleComandaOrderByWithRelationInput | DetalleComandaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DetalleComandas.
     */
    cursor?: DetalleComandaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleComandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleComandas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DetalleComandas.
     */
    distinct?: DetalleComandaScalarFieldEnum | DetalleComandaScalarFieldEnum[]
  }

  /**
   * DetalleComanda findFirstOrThrow
   */
  export type DetalleComandaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
    /**
     * Filter, which DetalleComanda to fetch.
     */
    where?: DetalleComandaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleComandas to fetch.
     */
    orderBy?: DetalleComandaOrderByWithRelationInput | DetalleComandaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DetalleComandas.
     */
    cursor?: DetalleComandaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleComandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleComandas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DetalleComandas.
     */
    distinct?: DetalleComandaScalarFieldEnum | DetalleComandaScalarFieldEnum[]
  }

  /**
   * DetalleComanda findMany
   */
  export type DetalleComandaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
    /**
     * Filter, which DetalleComandas to fetch.
     */
    where?: DetalleComandaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DetalleComandas to fetch.
     */
    orderBy?: DetalleComandaOrderByWithRelationInput | DetalleComandaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DetalleComandas.
     */
    cursor?: DetalleComandaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DetalleComandas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DetalleComandas.
     */
    skip?: number
    distinct?: DetalleComandaScalarFieldEnum | DetalleComandaScalarFieldEnum[]
  }

  /**
   * DetalleComanda create
   */
  export type DetalleComandaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
    /**
     * The data needed to create a DetalleComanda.
     */
    data: XOR<DetalleComandaCreateInput, DetalleComandaUncheckedCreateInput>
  }

  /**
   * DetalleComanda createMany
   */
  export type DetalleComandaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DetalleComandas.
     */
    data: DetalleComandaCreateManyInput | DetalleComandaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DetalleComanda createManyAndReturn
   */
  export type DetalleComandaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * The data used to create many DetalleComandas.
     */
    data: DetalleComandaCreateManyInput | DetalleComandaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DetalleComanda update
   */
  export type DetalleComandaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
    /**
     * The data needed to update a DetalleComanda.
     */
    data: XOR<DetalleComandaUpdateInput, DetalleComandaUncheckedUpdateInput>
    /**
     * Choose, which DetalleComanda to update.
     */
    where: DetalleComandaWhereUniqueInput
  }

  /**
   * DetalleComanda updateMany
   */
  export type DetalleComandaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DetalleComandas.
     */
    data: XOR<DetalleComandaUpdateManyMutationInput, DetalleComandaUncheckedUpdateManyInput>
    /**
     * Filter which DetalleComandas to update
     */
    where?: DetalleComandaWhereInput
    /**
     * Limit how many DetalleComandas to update.
     */
    limit?: number
  }

  /**
   * DetalleComanda updateManyAndReturn
   */
  export type DetalleComandaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * The data used to update DetalleComandas.
     */
    data: XOR<DetalleComandaUpdateManyMutationInput, DetalleComandaUncheckedUpdateManyInput>
    /**
     * Filter which DetalleComandas to update
     */
    where?: DetalleComandaWhereInput
    /**
     * Limit how many DetalleComandas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DetalleComanda upsert
   */
  export type DetalleComandaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
    /**
     * The filter to search for the DetalleComanda to update in case it exists.
     */
    where: DetalleComandaWhereUniqueInput
    /**
     * In case the DetalleComanda found by the `where` argument doesn't exist, create a new DetalleComanda with this data.
     */
    create: XOR<DetalleComandaCreateInput, DetalleComandaUncheckedCreateInput>
    /**
     * In case the DetalleComanda was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DetalleComandaUpdateInput, DetalleComandaUncheckedUpdateInput>
  }

  /**
   * DetalleComanda delete
   */
  export type DetalleComandaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
    /**
     * Filter which DetalleComanda to delete.
     */
    where: DetalleComandaWhereUniqueInput
  }

  /**
   * DetalleComanda deleteMany
   */
  export type DetalleComandaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DetalleComandas to delete
     */
    where?: DetalleComandaWhereInput
    /**
     * Limit how many DetalleComandas to delete.
     */
    limit?: number
  }

  /**
   * DetalleComanda.aditamentos
   */
  export type DetalleComanda$aditamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
    where?: ComandaAditamentosWhereInput
    orderBy?: ComandaAditamentosOrderByWithRelationInput | ComandaAditamentosOrderByWithRelationInput[]
    cursor?: ComandaAditamentosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComandaAditamentosScalarFieldEnum | ComandaAditamentosScalarFieldEnum[]
  }

  /**
   * DetalleComanda without action
   */
  export type DetalleComandaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DetalleComanda
     */
    select?: DetalleComandaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DetalleComanda
     */
    omit?: DetalleComandaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DetalleComandaInclude<ExtArgs> | null
  }


  /**
   * Model ComandaAditamentos
   */

  export type AggregateComandaAditamentos = {
    _count: ComandaAditamentosCountAggregateOutputType | null
    _avg: ComandaAditamentosAvgAggregateOutputType | null
    _sum: ComandaAditamentosSumAggregateOutputType | null
    _min: ComandaAditamentosMinAggregateOutputType | null
    _max: ComandaAditamentosMaxAggregateOutputType | null
  }

  export type ComandaAditamentosAvgAggregateOutputType = {
    id_detalle: number | null
    id_aditamento: number | null
  }

  export type ComandaAditamentosSumAggregateOutputType = {
    id_detalle: number | null
    id_aditamento: number | null
  }

  export type ComandaAditamentosMinAggregateOutputType = {
    id_detalle: number | null
    id_aditamento: number | null
    confirmacion: boolean | null
  }

  export type ComandaAditamentosMaxAggregateOutputType = {
    id_detalle: number | null
    id_aditamento: number | null
    confirmacion: boolean | null
  }

  export type ComandaAditamentosCountAggregateOutputType = {
    id_detalle: number
    id_aditamento: number
    confirmacion: number
    _all: number
  }


  export type ComandaAditamentosAvgAggregateInputType = {
    id_detalle?: true
    id_aditamento?: true
  }

  export type ComandaAditamentosSumAggregateInputType = {
    id_detalle?: true
    id_aditamento?: true
  }

  export type ComandaAditamentosMinAggregateInputType = {
    id_detalle?: true
    id_aditamento?: true
    confirmacion?: true
  }

  export type ComandaAditamentosMaxAggregateInputType = {
    id_detalle?: true
    id_aditamento?: true
    confirmacion?: true
  }

  export type ComandaAditamentosCountAggregateInputType = {
    id_detalle?: true
    id_aditamento?: true
    confirmacion?: true
    _all?: true
  }

  export type ComandaAditamentosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComandaAditamentos to aggregate.
     */
    where?: ComandaAditamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComandaAditamentos to fetch.
     */
    orderBy?: ComandaAditamentosOrderByWithRelationInput | ComandaAditamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComandaAditamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComandaAditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComandaAditamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComandaAditamentos
    **/
    _count?: true | ComandaAditamentosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComandaAditamentosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComandaAditamentosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComandaAditamentosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComandaAditamentosMaxAggregateInputType
  }

  export type GetComandaAditamentosAggregateType<T extends ComandaAditamentosAggregateArgs> = {
        [P in keyof T & keyof AggregateComandaAditamentos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComandaAditamentos[P]>
      : GetScalarType<T[P], AggregateComandaAditamentos[P]>
  }




  export type ComandaAditamentosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComandaAditamentosWhereInput
    orderBy?: ComandaAditamentosOrderByWithAggregationInput | ComandaAditamentosOrderByWithAggregationInput[]
    by: ComandaAditamentosScalarFieldEnum[] | ComandaAditamentosScalarFieldEnum
    having?: ComandaAditamentosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComandaAditamentosCountAggregateInputType | true
    _avg?: ComandaAditamentosAvgAggregateInputType
    _sum?: ComandaAditamentosSumAggregateInputType
    _min?: ComandaAditamentosMinAggregateInputType
    _max?: ComandaAditamentosMaxAggregateInputType
  }

  export type ComandaAditamentosGroupByOutputType = {
    id_detalle: number
    id_aditamento: number
    confirmacion: boolean
    _count: ComandaAditamentosCountAggregateOutputType | null
    _avg: ComandaAditamentosAvgAggregateOutputType | null
    _sum: ComandaAditamentosSumAggregateOutputType | null
    _min: ComandaAditamentosMinAggregateOutputType | null
    _max: ComandaAditamentosMaxAggregateOutputType | null
  }

  type GetComandaAditamentosGroupByPayload<T extends ComandaAditamentosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComandaAditamentosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComandaAditamentosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComandaAditamentosGroupByOutputType[P]>
            : GetScalarType<T[P], ComandaAditamentosGroupByOutputType[P]>
        }
      >
    >


  export type ComandaAditamentosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_detalle?: boolean
    id_aditamento?: boolean
    confirmacion?: boolean
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    detalle?: boolean | DetalleComandaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comandaAditamentos"]>

  export type ComandaAditamentosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_detalle?: boolean
    id_aditamento?: boolean
    confirmacion?: boolean
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    detalle?: boolean | DetalleComandaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comandaAditamentos"]>

  export type ComandaAditamentosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_detalle?: boolean
    id_aditamento?: boolean
    confirmacion?: boolean
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    detalle?: boolean | DetalleComandaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comandaAditamentos"]>

  export type ComandaAditamentosSelectScalar = {
    id_detalle?: boolean
    id_aditamento?: boolean
    confirmacion?: boolean
  }

  export type ComandaAditamentosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_detalle" | "id_aditamento" | "confirmacion", ExtArgs["result"]["comandaAditamentos"]>
  export type ComandaAditamentosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    detalle?: boolean | DetalleComandaDefaultArgs<ExtArgs>
  }
  export type ComandaAditamentosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    detalle?: boolean | DetalleComandaDefaultArgs<ExtArgs>
  }
  export type ComandaAditamentosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aditamento?: boolean | AditamentoDefaultArgs<ExtArgs>
    detalle?: boolean | DetalleComandaDefaultArgs<ExtArgs>
  }

  export type $ComandaAditamentosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComandaAditamentos"
    objects: {
      aditamento: Prisma.$AditamentoPayload<ExtArgs>
      detalle: Prisma.$DetalleComandaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_detalle: number
      id_aditamento: number
      confirmacion: boolean
    }, ExtArgs["result"]["comandaAditamentos"]>
    composites: {}
  }

  type ComandaAditamentosGetPayload<S extends boolean | null | undefined | ComandaAditamentosDefaultArgs> = $Result.GetResult<Prisma.$ComandaAditamentosPayload, S>

  type ComandaAditamentosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComandaAditamentosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComandaAditamentosCountAggregateInputType | true
    }

  export interface ComandaAditamentosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComandaAditamentos'], meta: { name: 'ComandaAditamentos' } }
    /**
     * Find zero or one ComandaAditamentos that matches the filter.
     * @param {ComandaAditamentosFindUniqueArgs} args - Arguments to find a ComandaAditamentos
     * @example
     * // Get one ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComandaAditamentosFindUniqueArgs>(args: SelectSubset<T, ComandaAditamentosFindUniqueArgs<ExtArgs>>): Prisma__ComandaAditamentosClient<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ComandaAditamentos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComandaAditamentosFindUniqueOrThrowArgs} args - Arguments to find a ComandaAditamentos
     * @example
     * // Get one ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComandaAditamentosFindUniqueOrThrowArgs>(args: SelectSubset<T, ComandaAditamentosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComandaAditamentosClient<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComandaAditamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaAditamentosFindFirstArgs} args - Arguments to find a ComandaAditamentos
     * @example
     * // Get one ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComandaAditamentosFindFirstArgs>(args?: SelectSubset<T, ComandaAditamentosFindFirstArgs<ExtArgs>>): Prisma__ComandaAditamentosClient<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComandaAditamentos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaAditamentosFindFirstOrThrowArgs} args - Arguments to find a ComandaAditamentos
     * @example
     * // Get one ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComandaAditamentosFindFirstOrThrowArgs>(args?: SelectSubset<T, ComandaAditamentosFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComandaAditamentosClient<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ComandaAditamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaAditamentosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.findMany()
     * 
     * // Get first 10 ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.findMany({ take: 10 })
     * 
     * // Only select the `id_detalle`
     * const comandaAditamentosWithId_detalleOnly = await prisma.comandaAditamentos.findMany({ select: { id_detalle: true } })
     * 
     */
    findMany<T extends ComandaAditamentosFindManyArgs>(args?: SelectSubset<T, ComandaAditamentosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ComandaAditamentos.
     * @param {ComandaAditamentosCreateArgs} args - Arguments to create a ComandaAditamentos.
     * @example
     * // Create one ComandaAditamentos
     * const ComandaAditamentos = await prisma.comandaAditamentos.create({
     *   data: {
     *     // ... data to create a ComandaAditamentos
     *   }
     * })
     * 
     */
    create<T extends ComandaAditamentosCreateArgs>(args: SelectSubset<T, ComandaAditamentosCreateArgs<ExtArgs>>): Prisma__ComandaAditamentosClient<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ComandaAditamentos.
     * @param {ComandaAditamentosCreateManyArgs} args - Arguments to create many ComandaAditamentos.
     * @example
     * // Create many ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComandaAditamentosCreateManyArgs>(args?: SelectSubset<T, ComandaAditamentosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComandaAditamentos and returns the data saved in the database.
     * @param {ComandaAditamentosCreateManyAndReturnArgs} args - Arguments to create many ComandaAditamentos.
     * @example
     * // Create many ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComandaAditamentos and only return the `id_detalle`
     * const comandaAditamentosWithId_detalleOnly = await prisma.comandaAditamentos.createManyAndReturn({
     *   select: { id_detalle: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComandaAditamentosCreateManyAndReturnArgs>(args?: SelectSubset<T, ComandaAditamentosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ComandaAditamentos.
     * @param {ComandaAditamentosDeleteArgs} args - Arguments to delete one ComandaAditamentos.
     * @example
     * // Delete one ComandaAditamentos
     * const ComandaAditamentos = await prisma.comandaAditamentos.delete({
     *   where: {
     *     // ... filter to delete one ComandaAditamentos
     *   }
     * })
     * 
     */
    delete<T extends ComandaAditamentosDeleteArgs>(args: SelectSubset<T, ComandaAditamentosDeleteArgs<ExtArgs>>): Prisma__ComandaAditamentosClient<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ComandaAditamentos.
     * @param {ComandaAditamentosUpdateArgs} args - Arguments to update one ComandaAditamentos.
     * @example
     * // Update one ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComandaAditamentosUpdateArgs>(args: SelectSubset<T, ComandaAditamentosUpdateArgs<ExtArgs>>): Prisma__ComandaAditamentosClient<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ComandaAditamentos.
     * @param {ComandaAditamentosDeleteManyArgs} args - Arguments to filter ComandaAditamentos to delete.
     * @example
     * // Delete a few ComandaAditamentos
     * const { count } = await prisma.comandaAditamentos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComandaAditamentosDeleteManyArgs>(args?: SelectSubset<T, ComandaAditamentosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComandaAditamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaAditamentosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComandaAditamentosUpdateManyArgs>(args: SelectSubset<T, ComandaAditamentosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComandaAditamentos and returns the data updated in the database.
     * @param {ComandaAditamentosUpdateManyAndReturnArgs} args - Arguments to update many ComandaAditamentos.
     * @example
     * // Update many ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ComandaAditamentos and only return the `id_detalle`
     * const comandaAditamentosWithId_detalleOnly = await prisma.comandaAditamentos.updateManyAndReturn({
     *   select: { id_detalle: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComandaAditamentosUpdateManyAndReturnArgs>(args: SelectSubset<T, ComandaAditamentosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ComandaAditamentos.
     * @param {ComandaAditamentosUpsertArgs} args - Arguments to update or create a ComandaAditamentos.
     * @example
     * // Update or create a ComandaAditamentos
     * const comandaAditamentos = await prisma.comandaAditamentos.upsert({
     *   create: {
     *     // ... data to create a ComandaAditamentos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComandaAditamentos we want to update
     *   }
     * })
     */
    upsert<T extends ComandaAditamentosUpsertArgs>(args: SelectSubset<T, ComandaAditamentosUpsertArgs<ExtArgs>>): Prisma__ComandaAditamentosClient<$Result.GetResult<Prisma.$ComandaAditamentosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ComandaAditamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaAditamentosCountArgs} args - Arguments to filter ComandaAditamentos to count.
     * @example
     * // Count the number of ComandaAditamentos
     * const count = await prisma.comandaAditamentos.count({
     *   where: {
     *     // ... the filter for the ComandaAditamentos we want to count
     *   }
     * })
    **/
    count<T extends ComandaAditamentosCountArgs>(
      args?: Subset<T, ComandaAditamentosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComandaAditamentosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComandaAditamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaAditamentosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ComandaAditamentosAggregateArgs>(args: Subset<T, ComandaAditamentosAggregateArgs>): Prisma.PrismaPromise<GetComandaAditamentosAggregateType<T>>

    /**
     * Group by ComandaAditamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComandaAditamentosGroupByArgs} args - Group by arguments.
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
      T extends ComandaAditamentosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComandaAditamentosGroupByArgs['orderBy'] }
        : { orderBy?: ComandaAditamentosGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ComandaAditamentosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComandaAditamentosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComandaAditamentos model
   */
  readonly fields: ComandaAditamentosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComandaAditamentos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComandaAditamentosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aditamento<T extends AditamentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AditamentoDefaultArgs<ExtArgs>>): Prisma__AditamentoClient<$Result.GetResult<Prisma.$AditamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    detalle<T extends DetalleComandaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DetalleComandaDefaultArgs<ExtArgs>>): Prisma__DetalleComandaClient<$Result.GetResult<Prisma.$DetalleComandaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ComandaAditamentos model
   */
  interface ComandaAditamentosFieldRefs {
    readonly id_detalle: FieldRef<"ComandaAditamentos", 'Int'>
    readonly id_aditamento: FieldRef<"ComandaAditamentos", 'Int'>
    readonly confirmacion: FieldRef<"ComandaAditamentos", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ComandaAditamentos findUnique
   */
  export type ComandaAditamentosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
    /**
     * Filter, which ComandaAditamentos to fetch.
     */
    where: ComandaAditamentosWhereUniqueInput
  }

  /**
   * ComandaAditamentos findUniqueOrThrow
   */
  export type ComandaAditamentosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
    /**
     * Filter, which ComandaAditamentos to fetch.
     */
    where: ComandaAditamentosWhereUniqueInput
  }

  /**
   * ComandaAditamentos findFirst
   */
  export type ComandaAditamentosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
    /**
     * Filter, which ComandaAditamentos to fetch.
     */
    where?: ComandaAditamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComandaAditamentos to fetch.
     */
    orderBy?: ComandaAditamentosOrderByWithRelationInput | ComandaAditamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComandaAditamentos.
     */
    cursor?: ComandaAditamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComandaAditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComandaAditamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComandaAditamentos.
     */
    distinct?: ComandaAditamentosScalarFieldEnum | ComandaAditamentosScalarFieldEnum[]
  }

  /**
   * ComandaAditamentos findFirstOrThrow
   */
  export type ComandaAditamentosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
    /**
     * Filter, which ComandaAditamentos to fetch.
     */
    where?: ComandaAditamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComandaAditamentos to fetch.
     */
    orderBy?: ComandaAditamentosOrderByWithRelationInput | ComandaAditamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComandaAditamentos.
     */
    cursor?: ComandaAditamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComandaAditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComandaAditamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComandaAditamentos.
     */
    distinct?: ComandaAditamentosScalarFieldEnum | ComandaAditamentosScalarFieldEnum[]
  }

  /**
   * ComandaAditamentos findMany
   */
  export type ComandaAditamentosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
    /**
     * Filter, which ComandaAditamentos to fetch.
     */
    where?: ComandaAditamentosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComandaAditamentos to fetch.
     */
    orderBy?: ComandaAditamentosOrderByWithRelationInput | ComandaAditamentosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComandaAditamentos.
     */
    cursor?: ComandaAditamentosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComandaAditamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComandaAditamentos.
     */
    skip?: number
    distinct?: ComandaAditamentosScalarFieldEnum | ComandaAditamentosScalarFieldEnum[]
  }

  /**
   * ComandaAditamentos create
   */
  export type ComandaAditamentosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
    /**
     * The data needed to create a ComandaAditamentos.
     */
    data: XOR<ComandaAditamentosCreateInput, ComandaAditamentosUncheckedCreateInput>
  }

  /**
   * ComandaAditamentos createMany
   */
  export type ComandaAditamentosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComandaAditamentos.
     */
    data: ComandaAditamentosCreateManyInput | ComandaAditamentosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComandaAditamentos createManyAndReturn
   */
  export type ComandaAditamentosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * The data used to create many ComandaAditamentos.
     */
    data: ComandaAditamentosCreateManyInput | ComandaAditamentosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComandaAditamentos update
   */
  export type ComandaAditamentosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
    /**
     * The data needed to update a ComandaAditamentos.
     */
    data: XOR<ComandaAditamentosUpdateInput, ComandaAditamentosUncheckedUpdateInput>
    /**
     * Choose, which ComandaAditamentos to update.
     */
    where: ComandaAditamentosWhereUniqueInput
  }

  /**
   * ComandaAditamentos updateMany
   */
  export type ComandaAditamentosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComandaAditamentos.
     */
    data: XOR<ComandaAditamentosUpdateManyMutationInput, ComandaAditamentosUncheckedUpdateManyInput>
    /**
     * Filter which ComandaAditamentos to update
     */
    where?: ComandaAditamentosWhereInput
    /**
     * Limit how many ComandaAditamentos to update.
     */
    limit?: number
  }

  /**
   * ComandaAditamentos updateManyAndReturn
   */
  export type ComandaAditamentosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * The data used to update ComandaAditamentos.
     */
    data: XOR<ComandaAditamentosUpdateManyMutationInput, ComandaAditamentosUncheckedUpdateManyInput>
    /**
     * Filter which ComandaAditamentos to update
     */
    where?: ComandaAditamentosWhereInput
    /**
     * Limit how many ComandaAditamentos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComandaAditamentos upsert
   */
  export type ComandaAditamentosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
    /**
     * The filter to search for the ComandaAditamentos to update in case it exists.
     */
    where: ComandaAditamentosWhereUniqueInput
    /**
     * In case the ComandaAditamentos found by the `where` argument doesn't exist, create a new ComandaAditamentos with this data.
     */
    create: XOR<ComandaAditamentosCreateInput, ComandaAditamentosUncheckedCreateInput>
    /**
     * In case the ComandaAditamentos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComandaAditamentosUpdateInput, ComandaAditamentosUncheckedUpdateInput>
  }

  /**
   * ComandaAditamentos delete
   */
  export type ComandaAditamentosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
    /**
     * Filter which ComandaAditamentos to delete.
     */
    where: ComandaAditamentosWhereUniqueInput
  }

  /**
   * ComandaAditamentos deleteMany
   */
  export type ComandaAditamentosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComandaAditamentos to delete
     */
    where?: ComandaAditamentosWhereInput
    /**
     * Limit how many ComandaAditamentos to delete.
     */
    limit?: number
  }

  /**
   * ComandaAditamentos without action
   */
  export type ComandaAditamentosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComandaAditamentos
     */
    select?: ComandaAditamentosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComandaAditamentos
     */
    omit?: ComandaAditamentosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComandaAditamentosInclude<ExtArgs> | null
  }


  /**
   * Model ProductoImagen
   */

  export type AggregateProductoImagen = {
    _count: ProductoImagenCountAggregateOutputType | null
    _avg: ProductoImagenAvgAggregateOutputType | null
    _sum: ProductoImagenSumAggregateOutputType | null
    _min: ProductoImagenMinAggregateOutputType | null
    _max: ProductoImagenMaxAggregateOutputType | null
  }

  export type ProductoImagenAvgAggregateOutputType = {
    id_imagen: number | null
    id_producto: number | null
  }

  export type ProductoImagenSumAggregateOutputType = {
    id_imagen: number | null
    id_producto: number | null
  }

  export type ProductoImagenMinAggregateOutputType = {
    id_imagen: number | null
    url: string | null
    id_producto: number | null
  }

  export type ProductoImagenMaxAggregateOutputType = {
    id_imagen: number | null
    url: string | null
    id_producto: number | null
  }

  export type ProductoImagenCountAggregateOutputType = {
    id_imagen: number
    url: number
    id_producto: number
    _all: number
  }


  export type ProductoImagenAvgAggregateInputType = {
    id_imagen?: true
    id_producto?: true
  }

  export type ProductoImagenSumAggregateInputType = {
    id_imagen?: true
    id_producto?: true
  }

  export type ProductoImagenMinAggregateInputType = {
    id_imagen?: true
    url?: true
    id_producto?: true
  }

  export type ProductoImagenMaxAggregateInputType = {
    id_imagen?: true
    url?: true
    id_producto?: true
  }

  export type ProductoImagenCountAggregateInputType = {
    id_imagen?: true
    url?: true
    id_producto?: true
    _all?: true
  }

  export type ProductoImagenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductoImagen to aggregate.
     */
    where?: ProductoImagenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoImagens to fetch.
     */
    orderBy?: ProductoImagenOrderByWithRelationInput | ProductoImagenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductoImagenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoImagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoImagens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductoImagens
    **/
    _count?: true | ProductoImagenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductoImagenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductoImagenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductoImagenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductoImagenMaxAggregateInputType
  }

  export type GetProductoImagenAggregateType<T extends ProductoImagenAggregateArgs> = {
        [P in keyof T & keyof AggregateProductoImagen]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductoImagen[P]>
      : GetScalarType<T[P], AggregateProductoImagen[P]>
  }




  export type ProductoImagenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoImagenWhereInput
    orderBy?: ProductoImagenOrderByWithAggregationInput | ProductoImagenOrderByWithAggregationInput[]
    by: ProductoImagenScalarFieldEnum[] | ProductoImagenScalarFieldEnum
    having?: ProductoImagenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductoImagenCountAggregateInputType | true
    _avg?: ProductoImagenAvgAggregateInputType
    _sum?: ProductoImagenSumAggregateInputType
    _min?: ProductoImagenMinAggregateInputType
    _max?: ProductoImagenMaxAggregateInputType
  }

  export type ProductoImagenGroupByOutputType = {
    id_imagen: number
    url: string
    id_producto: number
    _count: ProductoImagenCountAggregateOutputType | null
    _avg: ProductoImagenAvgAggregateOutputType | null
    _sum: ProductoImagenSumAggregateOutputType | null
    _min: ProductoImagenMinAggregateOutputType | null
    _max: ProductoImagenMaxAggregateOutputType | null
  }

  type GetProductoImagenGroupByPayload<T extends ProductoImagenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductoImagenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductoImagenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductoImagenGroupByOutputType[P]>
            : GetScalarType<T[P], ProductoImagenGroupByOutputType[P]>
        }
      >
    >


  export type ProductoImagenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_imagen?: boolean
    url?: boolean
    id_producto?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productoImagen"]>

  export type ProductoImagenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_imagen?: boolean
    url?: boolean
    id_producto?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productoImagen"]>

  export type ProductoImagenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_imagen?: boolean
    url?: boolean
    id_producto?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productoImagen"]>

  export type ProductoImagenSelectScalar = {
    id_imagen?: boolean
    url?: boolean
    id_producto?: boolean
  }

  export type ProductoImagenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_imagen" | "url" | "id_producto", ExtArgs["result"]["productoImagen"]>
  export type ProductoImagenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type ProductoImagenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type ProductoImagenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }

  export type $ProductoImagenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductoImagen"
    objects: {
      producto: Prisma.$ProductoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_imagen: number
      url: string
      id_producto: number
    }, ExtArgs["result"]["productoImagen"]>
    composites: {}
  }

  type ProductoImagenGetPayload<S extends boolean | null | undefined | ProductoImagenDefaultArgs> = $Result.GetResult<Prisma.$ProductoImagenPayload, S>

  type ProductoImagenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductoImagenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductoImagenCountAggregateInputType | true
    }

  export interface ProductoImagenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductoImagen'], meta: { name: 'ProductoImagen' } }
    /**
     * Find zero or one ProductoImagen that matches the filter.
     * @param {ProductoImagenFindUniqueArgs} args - Arguments to find a ProductoImagen
     * @example
     * // Get one ProductoImagen
     * const productoImagen = await prisma.productoImagen.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductoImagenFindUniqueArgs>(args: SelectSubset<T, ProductoImagenFindUniqueArgs<ExtArgs>>): Prisma__ProductoImagenClient<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductoImagen that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductoImagenFindUniqueOrThrowArgs} args - Arguments to find a ProductoImagen
     * @example
     * // Get one ProductoImagen
     * const productoImagen = await prisma.productoImagen.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductoImagenFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductoImagenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductoImagenClient<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductoImagen that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoImagenFindFirstArgs} args - Arguments to find a ProductoImagen
     * @example
     * // Get one ProductoImagen
     * const productoImagen = await prisma.productoImagen.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductoImagenFindFirstArgs>(args?: SelectSubset<T, ProductoImagenFindFirstArgs<ExtArgs>>): Prisma__ProductoImagenClient<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductoImagen that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoImagenFindFirstOrThrowArgs} args - Arguments to find a ProductoImagen
     * @example
     * // Get one ProductoImagen
     * const productoImagen = await prisma.productoImagen.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductoImagenFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductoImagenFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductoImagenClient<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductoImagens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoImagenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductoImagens
     * const productoImagens = await prisma.productoImagen.findMany()
     * 
     * // Get first 10 ProductoImagens
     * const productoImagens = await prisma.productoImagen.findMany({ take: 10 })
     * 
     * // Only select the `id_imagen`
     * const productoImagenWithId_imagenOnly = await prisma.productoImagen.findMany({ select: { id_imagen: true } })
     * 
     */
    findMany<T extends ProductoImagenFindManyArgs>(args?: SelectSubset<T, ProductoImagenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductoImagen.
     * @param {ProductoImagenCreateArgs} args - Arguments to create a ProductoImagen.
     * @example
     * // Create one ProductoImagen
     * const ProductoImagen = await prisma.productoImagen.create({
     *   data: {
     *     // ... data to create a ProductoImagen
     *   }
     * })
     * 
     */
    create<T extends ProductoImagenCreateArgs>(args: SelectSubset<T, ProductoImagenCreateArgs<ExtArgs>>): Prisma__ProductoImagenClient<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductoImagens.
     * @param {ProductoImagenCreateManyArgs} args - Arguments to create many ProductoImagens.
     * @example
     * // Create many ProductoImagens
     * const productoImagen = await prisma.productoImagen.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductoImagenCreateManyArgs>(args?: SelectSubset<T, ProductoImagenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductoImagens and returns the data saved in the database.
     * @param {ProductoImagenCreateManyAndReturnArgs} args - Arguments to create many ProductoImagens.
     * @example
     * // Create many ProductoImagens
     * const productoImagen = await prisma.productoImagen.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductoImagens and only return the `id_imagen`
     * const productoImagenWithId_imagenOnly = await prisma.productoImagen.createManyAndReturn({
     *   select: { id_imagen: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductoImagenCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductoImagenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductoImagen.
     * @param {ProductoImagenDeleteArgs} args - Arguments to delete one ProductoImagen.
     * @example
     * // Delete one ProductoImagen
     * const ProductoImagen = await prisma.productoImagen.delete({
     *   where: {
     *     // ... filter to delete one ProductoImagen
     *   }
     * })
     * 
     */
    delete<T extends ProductoImagenDeleteArgs>(args: SelectSubset<T, ProductoImagenDeleteArgs<ExtArgs>>): Prisma__ProductoImagenClient<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductoImagen.
     * @param {ProductoImagenUpdateArgs} args - Arguments to update one ProductoImagen.
     * @example
     * // Update one ProductoImagen
     * const productoImagen = await prisma.productoImagen.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductoImagenUpdateArgs>(args: SelectSubset<T, ProductoImagenUpdateArgs<ExtArgs>>): Prisma__ProductoImagenClient<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductoImagens.
     * @param {ProductoImagenDeleteManyArgs} args - Arguments to filter ProductoImagens to delete.
     * @example
     * // Delete a few ProductoImagens
     * const { count } = await prisma.productoImagen.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductoImagenDeleteManyArgs>(args?: SelectSubset<T, ProductoImagenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductoImagens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoImagenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductoImagens
     * const productoImagen = await prisma.productoImagen.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductoImagenUpdateManyArgs>(args: SelectSubset<T, ProductoImagenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductoImagens and returns the data updated in the database.
     * @param {ProductoImagenUpdateManyAndReturnArgs} args - Arguments to update many ProductoImagens.
     * @example
     * // Update many ProductoImagens
     * const productoImagen = await prisma.productoImagen.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductoImagens and only return the `id_imagen`
     * const productoImagenWithId_imagenOnly = await prisma.productoImagen.updateManyAndReturn({
     *   select: { id_imagen: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductoImagenUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductoImagenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductoImagen.
     * @param {ProductoImagenUpsertArgs} args - Arguments to update or create a ProductoImagen.
     * @example
     * // Update or create a ProductoImagen
     * const productoImagen = await prisma.productoImagen.upsert({
     *   create: {
     *     // ... data to create a ProductoImagen
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductoImagen we want to update
     *   }
     * })
     */
    upsert<T extends ProductoImagenUpsertArgs>(args: SelectSubset<T, ProductoImagenUpsertArgs<ExtArgs>>): Prisma__ProductoImagenClient<$Result.GetResult<Prisma.$ProductoImagenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductoImagens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoImagenCountArgs} args - Arguments to filter ProductoImagens to count.
     * @example
     * // Count the number of ProductoImagens
     * const count = await prisma.productoImagen.count({
     *   where: {
     *     // ... the filter for the ProductoImagens we want to count
     *   }
     * })
    **/
    count<T extends ProductoImagenCountArgs>(
      args?: Subset<T, ProductoImagenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductoImagenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductoImagen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoImagenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductoImagenAggregateArgs>(args: Subset<T, ProductoImagenAggregateArgs>): Prisma.PrismaPromise<GetProductoImagenAggregateType<T>>

    /**
     * Group by ProductoImagen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoImagenGroupByArgs} args - Group by arguments.
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
      T extends ProductoImagenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductoImagenGroupByArgs['orderBy'] }
        : { orderBy?: ProductoImagenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductoImagenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductoImagenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductoImagen model
   */
  readonly fields: ProductoImagenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductoImagen.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductoImagenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProductoImagen model
   */
  interface ProductoImagenFieldRefs {
    readonly id_imagen: FieldRef<"ProductoImagen", 'Int'>
    readonly url: FieldRef<"ProductoImagen", 'String'>
    readonly id_producto: FieldRef<"ProductoImagen", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProductoImagen findUnique
   */
  export type ProductoImagenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenInclude<ExtArgs> | null
    /**
     * Filter, which ProductoImagen to fetch.
     */
    where: ProductoImagenWhereUniqueInput
  }

  /**
   * ProductoImagen findUniqueOrThrow
   */
  export type ProductoImagenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenInclude<ExtArgs> | null
    /**
     * Filter, which ProductoImagen to fetch.
     */
    where: ProductoImagenWhereUniqueInput
  }

  /**
   * ProductoImagen findFirst
   */
  export type ProductoImagenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenInclude<ExtArgs> | null
    /**
     * Filter, which ProductoImagen to fetch.
     */
    where?: ProductoImagenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoImagens to fetch.
     */
    orderBy?: ProductoImagenOrderByWithRelationInput | ProductoImagenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductoImagens.
     */
    cursor?: ProductoImagenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoImagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoImagens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductoImagens.
     */
    distinct?: ProductoImagenScalarFieldEnum | ProductoImagenScalarFieldEnum[]
  }

  /**
   * ProductoImagen findFirstOrThrow
   */
  export type ProductoImagenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenInclude<ExtArgs> | null
    /**
     * Filter, which ProductoImagen to fetch.
     */
    where?: ProductoImagenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoImagens to fetch.
     */
    orderBy?: ProductoImagenOrderByWithRelationInput | ProductoImagenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductoImagens.
     */
    cursor?: ProductoImagenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoImagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoImagens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductoImagens.
     */
    distinct?: ProductoImagenScalarFieldEnum | ProductoImagenScalarFieldEnum[]
  }

  /**
   * ProductoImagen findMany
   */
  export type ProductoImagenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenInclude<ExtArgs> | null
    /**
     * Filter, which ProductoImagens to fetch.
     */
    where?: ProductoImagenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductoImagens to fetch.
     */
    orderBy?: ProductoImagenOrderByWithRelationInput | ProductoImagenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductoImagens.
     */
    cursor?: ProductoImagenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductoImagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductoImagens.
     */
    skip?: number
    distinct?: ProductoImagenScalarFieldEnum | ProductoImagenScalarFieldEnum[]
  }

  /**
   * ProductoImagen create
   */
  export type ProductoImagenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductoImagen.
     */
    data: XOR<ProductoImagenCreateInput, ProductoImagenUncheckedCreateInput>
  }

  /**
   * ProductoImagen createMany
   */
  export type ProductoImagenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductoImagens.
     */
    data: ProductoImagenCreateManyInput | ProductoImagenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductoImagen createManyAndReturn
   */
  export type ProductoImagenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * The data used to create many ProductoImagens.
     */
    data: ProductoImagenCreateManyInput | ProductoImagenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductoImagen update
   */
  export type ProductoImagenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductoImagen.
     */
    data: XOR<ProductoImagenUpdateInput, ProductoImagenUncheckedUpdateInput>
    /**
     * Choose, which ProductoImagen to update.
     */
    where: ProductoImagenWhereUniqueInput
  }

  /**
   * ProductoImagen updateMany
   */
  export type ProductoImagenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductoImagens.
     */
    data: XOR<ProductoImagenUpdateManyMutationInput, ProductoImagenUncheckedUpdateManyInput>
    /**
     * Filter which ProductoImagens to update
     */
    where?: ProductoImagenWhereInput
    /**
     * Limit how many ProductoImagens to update.
     */
    limit?: number
  }

  /**
   * ProductoImagen updateManyAndReturn
   */
  export type ProductoImagenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * The data used to update ProductoImagens.
     */
    data: XOR<ProductoImagenUpdateManyMutationInput, ProductoImagenUncheckedUpdateManyInput>
    /**
     * Filter which ProductoImagens to update
     */
    where?: ProductoImagenWhereInput
    /**
     * Limit how many ProductoImagens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductoImagen upsert
   */
  export type ProductoImagenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductoImagen to update in case it exists.
     */
    where: ProductoImagenWhereUniqueInput
    /**
     * In case the ProductoImagen found by the `where` argument doesn't exist, create a new ProductoImagen with this data.
     */
    create: XOR<ProductoImagenCreateInput, ProductoImagenUncheckedCreateInput>
    /**
     * In case the ProductoImagen was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductoImagenUpdateInput, ProductoImagenUncheckedUpdateInput>
  }

  /**
   * ProductoImagen delete
   */
  export type ProductoImagenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenInclude<ExtArgs> | null
    /**
     * Filter which ProductoImagen to delete.
     */
    where: ProductoImagenWhereUniqueInput
  }

  /**
   * ProductoImagen deleteMany
   */
  export type ProductoImagenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductoImagens to delete
     */
    where?: ProductoImagenWhereInput
    /**
     * Limit how many ProductoImagens to delete.
     */
    limit?: number
  }

  /**
   * ProductoImagen without action
   */
  export type ProductoImagenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoImagen
     */
    select?: ProductoImagenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductoImagen
     */
    omit?: ProductoImagenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoImagenInclude<ExtArgs> | null
  }


  /**
   * Model HistorialAnalitico
   */

  export type AggregateHistorialAnalitico = {
    _count: HistorialAnaliticoCountAggregateOutputType | null
    _avg: HistorialAnaliticoAvgAggregateOutputType | null
    _sum: HistorialAnaliticoSumAggregateOutputType | null
    _min: HistorialAnaliticoMinAggregateOutputType | null
    _max: HistorialAnaliticoMaxAggregateOutputType | null
  }

  export type HistorialAnaliticoAvgAggregateOutputType = {
    id_historial: number | null
    id_producto: number | null
    id_subcategoria: number | null
    id_categoria: number | null
    hora: number | null
    dia_semana: number | null
    clima_id: number | null
  }

  export type HistorialAnaliticoSumAggregateOutputType = {
    id_historial: number | null
    id_producto: number | null
    id_subcategoria: number | null
    id_categoria: number | null
    hora: number | null
    dia_semana: number | null
    clima_id: number | null
  }

  export type HistorialAnaliticoMinAggregateOutputType = {
    id_historial: number | null
    id_producto: number | null
    id_subcategoria: number | null
    id_categoria: number | null
    hora: number | null
    dia_semana: number | null
    es_festivo: boolean | null
    clima_id: number | null
    fecha_registro: Date | null
  }

  export type HistorialAnaliticoMaxAggregateOutputType = {
    id_historial: number | null
    id_producto: number | null
    id_subcategoria: number | null
    id_categoria: number | null
    hora: number | null
    dia_semana: number | null
    es_festivo: boolean | null
    clima_id: number | null
    fecha_registro: Date | null
  }

  export type HistorialAnaliticoCountAggregateOutputType = {
    id_historial: number
    id_producto: number
    id_subcategoria: number
    id_categoria: number
    hora: number
    dia_semana: number
    es_festivo: number
    clima_id: number
    fecha_registro: number
    _all: number
  }


  export type HistorialAnaliticoAvgAggregateInputType = {
    id_historial?: true
    id_producto?: true
    id_subcategoria?: true
    id_categoria?: true
    hora?: true
    dia_semana?: true
    clima_id?: true
  }

  export type HistorialAnaliticoSumAggregateInputType = {
    id_historial?: true
    id_producto?: true
    id_subcategoria?: true
    id_categoria?: true
    hora?: true
    dia_semana?: true
    clima_id?: true
  }

  export type HistorialAnaliticoMinAggregateInputType = {
    id_historial?: true
    id_producto?: true
    id_subcategoria?: true
    id_categoria?: true
    hora?: true
    dia_semana?: true
    es_festivo?: true
    clima_id?: true
    fecha_registro?: true
  }

  export type HistorialAnaliticoMaxAggregateInputType = {
    id_historial?: true
    id_producto?: true
    id_subcategoria?: true
    id_categoria?: true
    hora?: true
    dia_semana?: true
    es_festivo?: true
    clima_id?: true
    fecha_registro?: true
  }

  export type HistorialAnaliticoCountAggregateInputType = {
    id_historial?: true
    id_producto?: true
    id_subcategoria?: true
    id_categoria?: true
    hora?: true
    dia_semana?: true
    es_festivo?: true
    clima_id?: true
    fecha_registro?: true
    _all?: true
  }

  export type HistorialAnaliticoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistorialAnalitico to aggregate.
     */
    where?: HistorialAnaliticoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistorialAnaliticos to fetch.
     */
    orderBy?: HistorialAnaliticoOrderByWithRelationInput | HistorialAnaliticoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HistorialAnaliticoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistorialAnaliticos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistorialAnaliticos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HistorialAnaliticos
    **/
    _count?: true | HistorialAnaliticoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HistorialAnaliticoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HistorialAnaliticoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HistorialAnaliticoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HistorialAnaliticoMaxAggregateInputType
  }

  export type GetHistorialAnaliticoAggregateType<T extends HistorialAnaliticoAggregateArgs> = {
        [P in keyof T & keyof AggregateHistorialAnalitico]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHistorialAnalitico[P]>
      : GetScalarType<T[P], AggregateHistorialAnalitico[P]>
  }




  export type HistorialAnaliticoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistorialAnaliticoWhereInput
    orderBy?: HistorialAnaliticoOrderByWithAggregationInput | HistorialAnaliticoOrderByWithAggregationInput[]
    by: HistorialAnaliticoScalarFieldEnum[] | HistorialAnaliticoScalarFieldEnum
    having?: HistorialAnaliticoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HistorialAnaliticoCountAggregateInputType | true
    _avg?: HistorialAnaliticoAvgAggregateInputType
    _sum?: HistorialAnaliticoSumAggregateInputType
    _min?: HistorialAnaliticoMinAggregateInputType
    _max?: HistorialAnaliticoMaxAggregateInputType
  }

  export type HistorialAnaliticoGroupByOutputType = {
    id_historial: number
    id_producto: number
    id_subcategoria: number
    id_categoria: number
    hora: number
    dia_semana: number
    es_festivo: boolean
    clima_id: number
    fecha_registro: Date | null
    _count: HistorialAnaliticoCountAggregateOutputType | null
    _avg: HistorialAnaliticoAvgAggregateOutputType | null
    _sum: HistorialAnaliticoSumAggregateOutputType | null
    _min: HistorialAnaliticoMinAggregateOutputType | null
    _max: HistorialAnaliticoMaxAggregateOutputType | null
  }

  type GetHistorialAnaliticoGroupByPayload<T extends HistorialAnaliticoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HistorialAnaliticoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HistorialAnaliticoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HistorialAnaliticoGroupByOutputType[P]>
            : GetScalarType<T[P], HistorialAnaliticoGroupByOutputType[P]>
        }
      >
    >


  export type HistorialAnaliticoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_historial?: boolean
    id_producto?: boolean
    id_subcategoria?: boolean
    id_categoria?: boolean
    hora?: boolean
    dia_semana?: boolean
    es_festivo?: boolean
    clima_id?: boolean
    fecha_registro?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    subcategorias?: boolean | SubCategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["historialAnalitico"]>

  export type HistorialAnaliticoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_historial?: boolean
    id_producto?: boolean
    id_subcategoria?: boolean
    id_categoria?: boolean
    hora?: boolean
    dia_semana?: boolean
    es_festivo?: boolean
    clima_id?: boolean
    fecha_registro?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    subcategorias?: boolean | SubCategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["historialAnalitico"]>

  export type HistorialAnaliticoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_historial?: boolean
    id_producto?: boolean
    id_subcategoria?: boolean
    id_categoria?: boolean
    hora?: boolean
    dia_semana?: boolean
    es_festivo?: boolean
    clima_id?: boolean
    fecha_registro?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    subcategorias?: boolean | SubCategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["historialAnalitico"]>

  export type HistorialAnaliticoSelectScalar = {
    id_historial?: boolean
    id_producto?: boolean
    id_subcategoria?: boolean
    id_categoria?: boolean
    hora?: boolean
    dia_semana?: boolean
    es_festivo?: boolean
    clima_id?: boolean
    fecha_registro?: boolean
  }

  export type HistorialAnaliticoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_historial" | "id_producto" | "id_subcategoria" | "id_categoria" | "hora" | "dia_semana" | "es_festivo" | "clima_id" | "fecha_registro", ExtArgs["result"]["historialAnalitico"]>
  export type HistorialAnaliticoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    subcategorias?: boolean | SubCategoriaDefaultArgs<ExtArgs>
  }
  export type HistorialAnaliticoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    subcategorias?: boolean | SubCategoriaDefaultArgs<ExtArgs>
  }
  export type HistorialAnaliticoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
    subcategorias?: boolean | SubCategoriaDefaultArgs<ExtArgs>
  }

  export type $HistorialAnaliticoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HistorialAnalitico"
    objects: {
      categoria: Prisma.$CategoriaPayload<ExtArgs>
      producto: Prisma.$ProductoPayload<ExtArgs>
      subcategorias: Prisma.$SubCategoriaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_historial: number
      id_producto: number
      id_subcategoria: number
      id_categoria: number
      hora: number
      dia_semana: number
      es_festivo: boolean
      clima_id: number
      fecha_registro: Date | null
    }, ExtArgs["result"]["historialAnalitico"]>
    composites: {}
  }

  type HistorialAnaliticoGetPayload<S extends boolean | null | undefined | HistorialAnaliticoDefaultArgs> = $Result.GetResult<Prisma.$HistorialAnaliticoPayload, S>

  type HistorialAnaliticoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HistorialAnaliticoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HistorialAnaliticoCountAggregateInputType | true
    }

  export interface HistorialAnaliticoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HistorialAnalitico'], meta: { name: 'HistorialAnalitico' } }
    /**
     * Find zero or one HistorialAnalitico that matches the filter.
     * @param {HistorialAnaliticoFindUniqueArgs} args - Arguments to find a HistorialAnalitico
     * @example
     * // Get one HistorialAnalitico
     * const historialAnalitico = await prisma.historialAnalitico.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HistorialAnaliticoFindUniqueArgs>(args: SelectSubset<T, HistorialAnaliticoFindUniqueArgs<ExtArgs>>): Prisma__HistorialAnaliticoClient<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HistorialAnalitico that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HistorialAnaliticoFindUniqueOrThrowArgs} args - Arguments to find a HistorialAnalitico
     * @example
     * // Get one HistorialAnalitico
     * const historialAnalitico = await prisma.historialAnalitico.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HistorialAnaliticoFindUniqueOrThrowArgs>(args: SelectSubset<T, HistorialAnaliticoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HistorialAnaliticoClient<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HistorialAnalitico that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialAnaliticoFindFirstArgs} args - Arguments to find a HistorialAnalitico
     * @example
     * // Get one HistorialAnalitico
     * const historialAnalitico = await prisma.historialAnalitico.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HistorialAnaliticoFindFirstArgs>(args?: SelectSubset<T, HistorialAnaliticoFindFirstArgs<ExtArgs>>): Prisma__HistorialAnaliticoClient<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HistorialAnalitico that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialAnaliticoFindFirstOrThrowArgs} args - Arguments to find a HistorialAnalitico
     * @example
     * // Get one HistorialAnalitico
     * const historialAnalitico = await prisma.historialAnalitico.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HistorialAnaliticoFindFirstOrThrowArgs>(args?: SelectSubset<T, HistorialAnaliticoFindFirstOrThrowArgs<ExtArgs>>): Prisma__HistorialAnaliticoClient<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HistorialAnaliticos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialAnaliticoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HistorialAnaliticos
     * const historialAnaliticos = await prisma.historialAnalitico.findMany()
     * 
     * // Get first 10 HistorialAnaliticos
     * const historialAnaliticos = await prisma.historialAnalitico.findMany({ take: 10 })
     * 
     * // Only select the `id_historial`
     * const historialAnaliticoWithId_historialOnly = await prisma.historialAnalitico.findMany({ select: { id_historial: true } })
     * 
     */
    findMany<T extends HistorialAnaliticoFindManyArgs>(args?: SelectSubset<T, HistorialAnaliticoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HistorialAnalitico.
     * @param {HistorialAnaliticoCreateArgs} args - Arguments to create a HistorialAnalitico.
     * @example
     * // Create one HistorialAnalitico
     * const HistorialAnalitico = await prisma.historialAnalitico.create({
     *   data: {
     *     // ... data to create a HistorialAnalitico
     *   }
     * })
     * 
     */
    create<T extends HistorialAnaliticoCreateArgs>(args: SelectSubset<T, HistorialAnaliticoCreateArgs<ExtArgs>>): Prisma__HistorialAnaliticoClient<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HistorialAnaliticos.
     * @param {HistorialAnaliticoCreateManyArgs} args - Arguments to create many HistorialAnaliticos.
     * @example
     * // Create many HistorialAnaliticos
     * const historialAnalitico = await prisma.historialAnalitico.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HistorialAnaliticoCreateManyArgs>(args?: SelectSubset<T, HistorialAnaliticoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HistorialAnaliticos and returns the data saved in the database.
     * @param {HistorialAnaliticoCreateManyAndReturnArgs} args - Arguments to create many HistorialAnaliticos.
     * @example
     * // Create many HistorialAnaliticos
     * const historialAnalitico = await prisma.historialAnalitico.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HistorialAnaliticos and only return the `id_historial`
     * const historialAnaliticoWithId_historialOnly = await prisma.historialAnalitico.createManyAndReturn({
     *   select: { id_historial: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HistorialAnaliticoCreateManyAndReturnArgs>(args?: SelectSubset<T, HistorialAnaliticoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HistorialAnalitico.
     * @param {HistorialAnaliticoDeleteArgs} args - Arguments to delete one HistorialAnalitico.
     * @example
     * // Delete one HistorialAnalitico
     * const HistorialAnalitico = await prisma.historialAnalitico.delete({
     *   where: {
     *     // ... filter to delete one HistorialAnalitico
     *   }
     * })
     * 
     */
    delete<T extends HistorialAnaliticoDeleteArgs>(args: SelectSubset<T, HistorialAnaliticoDeleteArgs<ExtArgs>>): Prisma__HistorialAnaliticoClient<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HistorialAnalitico.
     * @param {HistorialAnaliticoUpdateArgs} args - Arguments to update one HistorialAnalitico.
     * @example
     * // Update one HistorialAnalitico
     * const historialAnalitico = await prisma.historialAnalitico.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HistorialAnaliticoUpdateArgs>(args: SelectSubset<T, HistorialAnaliticoUpdateArgs<ExtArgs>>): Prisma__HistorialAnaliticoClient<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HistorialAnaliticos.
     * @param {HistorialAnaliticoDeleteManyArgs} args - Arguments to filter HistorialAnaliticos to delete.
     * @example
     * // Delete a few HistorialAnaliticos
     * const { count } = await prisma.historialAnalitico.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HistorialAnaliticoDeleteManyArgs>(args?: SelectSubset<T, HistorialAnaliticoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HistorialAnaliticos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialAnaliticoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HistorialAnaliticos
     * const historialAnalitico = await prisma.historialAnalitico.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HistorialAnaliticoUpdateManyArgs>(args: SelectSubset<T, HistorialAnaliticoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HistorialAnaliticos and returns the data updated in the database.
     * @param {HistorialAnaliticoUpdateManyAndReturnArgs} args - Arguments to update many HistorialAnaliticos.
     * @example
     * // Update many HistorialAnaliticos
     * const historialAnalitico = await prisma.historialAnalitico.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HistorialAnaliticos and only return the `id_historial`
     * const historialAnaliticoWithId_historialOnly = await prisma.historialAnalitico.updateManyAndReturn({
     *   select: { id_historial: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HistorialAnaliticoUpdateManyAndReturnArgs>(args: SelectSubset<T, HistorialAnaliticoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HistorialAnalitico.
     * @param {HistorialAnaliticoUpsertArgs} args - Arguments to update or create a HistorialAnalitico.
     * @example
     * // Update or create a HistorialAnalitico
     * const historialAnalitico = await prisma.historialAnalitico.upsert({
     *   create: {
     *     // ... data to create a HistorialAnalitico
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HistorialAnalitico we want to update
     *   }
     * })
     */
    upsert<T extends HistorialAnaliticoUpsertArgs>(args: SelectSubset<T, HistorialAnaliticoUpsertArgs<ExtArgs>>): Prisma__HistorialAnaliticoClient<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HistorialAnaliticos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialAnaliticoCountArgs} args - Arguments to filter HistorialAnaliticos to count.
     * @example
     * // Count the number of HistorialAnaliticos
     * const count = await prisma.historialAnalitico.count({
     *   where: {
     *     // ... the filter for the HistorialAnaliticos we want to count
     *   }
     * })
    **/
    count<T extends HistorialAnaliticoCountArgs>(
      args?: Subset<T, HistorialAnaliticoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HistorialAnaliticoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HistorialAnalitico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialAnaliticoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HistorialAnaliticoAggregateArgs>(args: Subset<T, HistorialAnaliticoAggregateArgs>): Prisma.PrismaPromise<GetHistorialAnaliticoAggregateType<T>>

    /**
     * Group by HistorialAnalitico.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistorialAnaliticoGroupByArgs} args - Group by arguments.
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
      T extends HistorialAnaliticoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HistorialAnaliticoGroupByArgs['orderBy'] }
        : { orderBy?: HistorialAnaliticoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HistorialAnaliticoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistorialAnaliticoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HistorialAnalitico model
   */
  readonly fields: HistorialAnaliticoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HistorialAnalitico.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HistorialAnaliticoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categoria<T extends CategoriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoriaDefaultArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subcategorias<T extends SubCategoriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubCategoriaDefaultArgs<ExtArgs>>): Prisma__SubCategoriaClient<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the HistorialAnalitico model
   */
  interface HistorialAnaliticoFieldRefs {
    readonly id_historial: FieldRef<"HistorialAnalitico", 'Int'>
    readonly id_producto: FieldRef<"HistorialAnalitico", 'Int'>
    readonly id_subcategoria: FieldRef<"HistorialAnalitico", 'Int'>
    readonly id_categoria: FieldRef<"HistorialAnalitico", 'Int'>
    readonly hora: FieldRef<"HistorialAnalitico", 'Int'>
    readonly dia_semana: FieldRef<"HistorialAnalitico", 'Int'>
    readonly es_festivo: FieldRef<"HistorialAnalitico", 'Boolean'>
    readonly clima_id: FieldRef<"HistorialAnalitico", 'Int'>
    readonly fecha_registro: FieldRef<"HistorialAnalitico", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HistorialAnalitico findUnique
   */
  export type HistorialAnaliticoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    /**
     * Filter, which HistorialAnalitico to fetch.
     */
    where: HistorialAnaliticoWhereUniqueInput
  }

  /**
   * HistorialAnalitico findUniqueOrThrow
   */
  export type HistorialAnaliticoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    /**
     * Filter, which HistorialAnalitico to fetch.
     */
    where: HistorialAnaliticoWhereUniqueInput
  }

  /**
   * HistorialAnalitico findFirst
   */
  export type HistorialAnaliticoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    /**
     * Filter, which HistorialAnalitico to fetch.
     */
    where?: HistorialAnaliticoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistorialAnaliticos to fetch.
     */
    orderBy?: HistorialAnaliticoOrderByWithRelationInput | HistorialAnaliticoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistorialAnaliticos.
     */
    cursor?: HistorialAnaliticoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistorialAnaliticos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistorialAnaliticos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistorialAnaliticos.
     */
    distinct?: HistorialAnaliticoScalarFieldEnum | HistorialAnaliticoScalarFieldEnum[]
  }

  /**
   * HistorialAnalitico findFirstOrThrow
   */
  export type HistorialAnaliticoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    /**
     * Filter, which HistorialAnalitico to fetch.
     */
    where?: HistorialAnaliticoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistorialAnaliticos to fetch.
     */
    orderBy?: HistorialAnaliticoOrderByWithRelationInput | HistorialAnaliticoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistorialAnaliticos.
     */
    cursor?: HistorialAnaliticoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistorialAnaliticos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistorialAnaliticos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistorialAnaliticos.
     */
    distinct?: HistorialAnaliticoScalarFieldEnum | HistorialAnaliticoScalarFieldEnum[]
  }

  /**
   * HistorialAnalitico findMany
   */
  export type HistorialAnaliticoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    /**
     * Filter, which HistorialAnaliticos to fetch.
     */
    where?: HistorialAnaliticoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistorialAnaliticos to fetch.
     */
    orderBy?: HistorialAnaliticoOrderByWithRelationInput | HistorialAnaliticoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HistorialAnaliticos.
     */
    cursor?: HistorialAnaliticoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistorialAnaliticos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistorialAnaliticos.
     */
    skip?: number
    distinct?: HistorialAnaliticoScalarFieldEnum | HistorialAnaliticoScalarFieldEnum[]
  }

  /**
   * HistorialAnalitico create
   */
  export type HistorialAnaliticoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    /**
     * The data needed to create a HistorialAnalitico.
     */
    data: XOR<HistorialAnaliticoCreateInput, HistorialAnaliticoUncheckedCreateInput>
  }

  /**
   * HistorialAnalitico createMany
   */
  export type HistorialAnaliticoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HistorialAnaliticos.
     */
    data: HistorialAnaliticoCreateManyInput | HistorialAnaliticoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HistorialAnalitico createManyAndReturn
   */
  export type HistorialAnaliticoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * The data used to create many HistorialAnaliticos.
     */
    data: HistorialAnaliticoCreateManyInput | HistorialAnaliticoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HistorialAnalitico update
   */
  export type HistorialAnaliticoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    /**
     * The data needed to update a HistorialAnalitico.
     */
    data: XOR<HistorialAnaliticoUpdateInput, HistorialAnaliticoUncheckedUpdateInput>
    /**
     * Choose, which HistorialAnalitico to update.
     */
    where: HistorialAnaliticoWhereUniqueInput
  }

  /**
   * HistorialAnalitico updateMany
   */
  export type HistorialAnaliticoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HistorialAnaliticos.
     */
    data: XOR<HistorialAnaliticoUpdateManyMutationInput, HistorialAnaliticoUncheckedUpdateManyInput>
    /**
     * Filter which HistorialAnaliticos to update
     */
    where?: HistorialAnaliticoWhereInput
    /**
     * Limit how many HistorialAnaliticos to update.
     */
    limit?: number
  }

  /**
   * HistorialAnalitico updateManyAndReturn
   */
  export type HistorialAnaliticoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * The data used to update HistorialAnaliticos.
     */
    data: XOR<HistorialAnaliticoUpdateManyMutationInput, HistorialAnaliticoUncheckedUpdateManyInput>
    /**
     * Filter which HistorialAnaliticos to update
     */
    where?: HistorialAnaliticoWhereInput
    /**
     * Limit how many HistorialAnaliticos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HistorialAnalitico upsert
   */
  export type HistorialAnaliticoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    /**
     * The filter to search for the HistorialAnalitico to update in case it exists.
     */
    where: HistorialAnaliticoWhereUniqueInput
    /**
     * In case the HistorialAnalitico found by the `where` argument doesn't exist, create a new HistorialAnalitico with this data.
     */
    create: XOR<HistorialAnaliticoCreateInput, HistorialAnaliticoUncheckedCreateInput>
    /**
     * In case the HistorialAnalitico was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HistorialAnaliticoUpdateInput, HistorialAnaliticoUncheckedUpdateInput>
  }

  /**
   * HistorialAnalitico delete
   */
  export type HistorialAnaliticoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    /**
     * Filter which HistorialAnalitico to delete.
     */
    where: HistorialAnaliticoWhereUniqueInput
  }

  /**
   * HistorialAnalitico deleteMany
   */
  export type HistorialAnaliticoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistorialAnaliticos to delete
     */
    where?: HistorialAnaliticoWhereInput
    /**
     * Limit how many HistorialAnaliticos to delete.
     */
    limit?: number
  }

  /**
   * HistorialAnalitico without action
   */
  export type HistorialAnaliticoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
  }


  /**
   * Model Categoria
   */

  export type AggregateCategoria = {
    _count: CategoriaCountAggregateOutputType | null
    _avg: CategoriaAvgAggregateOutputType | null
    _sum: CategoriaSumAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  export type CategoriaAvgAggregateOutputType = {
    id_categoria: number | null
  }

  export type CategoriaSumAggregateOutputType = {
    id_categoria: number | null
  }

  export type CategoriaMinAggregateOutputType = {
    id_categoria: number | null
    nombre: string | null
  }

  export type CategoriaMaxAggregateOutputType = {
    id_categoria: number | null
    nombre: string | null
  }

  export type CategoriaCountAggregateOutputType = {
    id_categoria: number
    nombre: number
    _all: number
  }


  export type CategoriaAvgAggregateInputType = {
    id_categoria?: true
  }

  export type CategoriaSumAggregateInputType = {
    id_categoria?: true
  }

  export type CategoriaMinAggregateInputType = {
    id_categoria?: true
    nombre?: true
  }

  export type CategoriaMaxAggregateInputType = {
    id_categoria?: true
    nombre?: true
  }

  export type CategoriaCountAggregateInputType = {
    id_categoria?: true
    nombre?: true
    _all?: true
  }

  export type CategoriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categoria to aggregate.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categorias
    **/
    _count?: true | CategoriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoriaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoriaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriaMaxAggregateInputType
  }

  export type GetCategoriaAggregateType<T extends CategoriaAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria[P]>
      : GetScalarType<T[P], AggregateCategoria[P]>
  }




  export type CategoriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriaWhereInput
    orderBy?: CategoriaOrderByWithAggregationInput | CategoriaOrderByWithAggregationInput[]
    by: CategoriaScalarFieldEnum[] | CategoriaScalarFieldEnum
    having?: CategoriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriaCountAggregateInputType | true
    _avg?: CategoriaAvgAggregateInputType
    _sum?: CategoriaSumAggregateInputType
    _min?: CategoriaMinAggregateInputType
    _max?: CategoriaMaxAggregateInputType
  }

  export type CategoriaGroupByOutputType = {
    id_categoria: number
    nombre: string
    _count: CategoriaCountAggregateOutputType | null
    _avg: CategoriaAvgAggregateOutputType | null
    _sum: CategoriaSumAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  type GetCategoriaGroupByPayload<T extends CategoriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
        }
      >
    >


  export type CategoriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categoria?: boolean
    nombre?: boolean
    historial?: boolean | Categoria$historialArgs<ExtArgs>
    productos?: boolean | Categoria$productosArgs<ExtArgs>
    subcategorias?: boolean | Categoria$subcategoriasArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categoria?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categoria?: boolean
    nombre?: boolean
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectScalar = {
    id_categoria?: boolean
    nombre?: boolean
  }

  export type CategoriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_categoria" | "nombre", ExtArgs["result"]["categoria"]>
  export type CategoriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    historial?: boolean | Categoria$historialArgs<ExtArgs>
    productos?: boolean | Categoria$productosArgs<ExtArgs>
    subcategorias?: boolean | Categoria$subcategoriasArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoriaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoriaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categoria"
    objects: {
      historial: Prisma.$HistorialAnaliticoPayload<ExtArgs>[]
      productos: Prisma.$ProductoPayload<ExtArgs>[]
      subcategorias: Prisma.$SubCategoriaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_categoria: number
      nombre: string
    }, ExtArgs["result"]["categoria"]>
    composites: {}
  }

  type CategoriaGetPayload<S extends boolean | null | undefined | CategoriaDefaultArgs> = $Result.GetResult<Prisma.$CategoriaPayload, S>

  type CategoriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriaCountAggregateInputType | true
    }

  export interface CategoriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categoria'], meta: { name: 'Categoria' } }
    /**
     * Find zero or one Categoria that matches the filter.
     * @param {CategoriaFindUniqueArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriaFindUniqueArgs>(args: SelectSubset<T, CategoriaFindUniqueArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categoria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoriaFindUniqueOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriaFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriaFindFirstArgs>(args?: SelectSubset<T, CategoriaFindFirstArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriaFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categoria.findMany()
     * 
     * // Get first 10 Categorias
     * const categorias = await prisma.categoria.findMany({ take: 10 })
     * 
     * // Only select the `id_categoria`
     * const categoriaWithId_categoriaOnly = await prisma.categoria.findMany({ select: { id_categoria: true } })
     * 
     */
    findMany<T extends CategoriaFindManyArgs>(args?: SelectSubset<T, CategoriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categoria.
     * @param {CategoriaCreateArgs} args - Arguments to create a Categoria.
     * @example
     * // Create one Categoria
     * const Categoria = await prisma.categoria.create({
     *   data: {
     *     // ... data to create a Categoria
     *   }
     * })
     * 
     */
    create<T extends CategoriaCreateArgs>(args: SelectSubset<T, CategoriaCreateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categorias.
     * @param {CategoriaCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriaCreateManyArgs>(args?: SelectSubset<T, CategoriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categorias and returns the data saved in the database.
     * @param {CategoriaCreateManyAndReturnArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categorias and only return the `id_categoria`
     * const categoriaWithId_categoriaOnly = await prisma.categoria.createManyAndReturn({
     *   select: { id_categoria: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoriaCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoriaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categoria.
     * @param {CategoriaDeleteArgs} args - Arguments to delete one Categoria.
     * @example
     * // Delete one Categoria
     * const Categoria = await prisma.categoria.delete({
     *   where: {
     *     // ... filter to delete one Categoria
     *   }
     * })
     * 
     */
    delete<T extends CategoriaDeleteArgs>(args: SelectSubset<T, CategoriaDeleteArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categoria.
     * @param {CategoriaUpdateArgs} args - Arguments to update one Categoria.
     * @example
     * // Update one Categoria
     * const categoria = await prisma.categoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriaUpdateArgs>(args: SelectSubset<T, CategoriaUpdateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categorias.
     * @param {CategoriaDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriaDeleteManyArgs>(args?: SelectSubset<T, CategoriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriaUpdateManyArgs>(args: SelectSubset<T, CategoriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias and returns the data updated in the database.
     * @param {CategoriaUpdateManyAndReturnArgs} args - Arguments to update many Categorias.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categorias and only return the `id_categoria`
     * const categoriaWithId_categoriaOnly = await prisma.categoria.updateManyAndReturn({
     *   select: { id_categoria: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoriaUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoriaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categoria.
     * @param {CategoriaUpsertArgs} args - Arguments to update or create a Categoria.
     * @example
     * // Update or create a Categoria
     * const categoria = await prisma.categoria.upsert({
     *   create: {
     *     // ... data to create a Categoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria we want to update
     *   }
     * })
     */
    upsert<T extends CategoriaUpsertArgs>(args: SelectSubset<T, CategoriaUpsertArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categoria.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
    **/
    count<T extends CategoriaCountArgs>(
      args?: Subset<T, CategoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoriaAggregateArgs>(args: Subset<T, CategoriaAggregateArgs>): Prisma.PrismaPromise<GetCategoriaAggregateType<T>>

    /**
     * Group by Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaGroupByArgs} args - Group by arguments.
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
      T extends CategoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriaGroupByArgs['orderBy'] }
        : { orderBy?: CategoriaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categoria model
   */
  readonly fields: CategoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    historial<T extends Categoria$historialArgs<ExtArgs> = {}>(args?: Subset<T, Categoria$historialArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    productos<T extends Categoria$productosArgs<ExtArgs> = {}>(args?: Subset<T, Categoria$productosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subcategorias<T extends Categoria$subcategoriasArgs<ExtArgs> = {}>(args?: Subset<T, Categoria$subcategoriasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Categoria model
   */
  interface CategoriaFieldRefs {
    readonly id_categoria: FieldRef<"Categoria", 'Int'>
    readonly nombre: FieldRef<"Categoria", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Categoria findUnique
   */
  export type CategoriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findUniqueOrThrow
   */
  export type CategoriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findFirst
   */
  export type CategoriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findFirstOrThrow
   */
  export type CategoriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findMany
   */
  export type CategoriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria create
   */
  export type CategoriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to create a Categoria.
     */
    data: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
  }

  /**
   * Categoria createMany
   */
  export type CategoriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria createManyAndReturn
   */
  export type CategoriaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria update
   */
  export type CategoriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to update a Categoria.
     */
    data: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
    /**
     * Choose, which Categoria to update.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria updateMany
   */
  export type CategoriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria updateManyAndReturn
   */
  export type CategoriaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria upsert
   */
  export type CategoriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The filter to search for the Categoria to update in case it exists.
     */
    where: CategoriaWhereUniqueInput
    /**
     * In case the Categoria found by the `where` argument doesn't exist, create a new Categoria with this data.
     */
    create: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
    /**
     * In case the Categoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
  }

  /**
   * Categoria delete
   */
  export type CategoriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter which Categoria to delete.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria deleteMany
   */
  export type CategoriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorias to delete
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to delete.
     */
    limit?: number
  }

  /**
   * Categoria.historial
   */
  export type Categoria$historialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    where?: HistorialAnaliticoWhereInput
    orderBy?: HistorialAnaliticoOrderByWithRelationInput | HistorialAnaliticoOrderByWithRelationInput[]
    cursor?: HistorialAnaliticoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HistorialAnaliticoScalarFieldEnum | HistorialAnaliticoScalarFieldEnum[]
  }

  /**
   * Categoria.productos
   */
  export type Categoria$productosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    cursor?: ProductoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Categoria.subcategorias
   */
  export type Categoria$subcategoriasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaInclude<ExtArgs> | null
    where?: SubCategoriaWhereInput
    orderBy?: SubCategoriaOrderByWithRelationInput | SubCategoriaOrderByWithRelationInput[]
    cursor?: SubCategoriaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubCategoriaScalarFieldEnum | SubCategoriaScalarFieldEnum[]
  }

  /**
   * Categoria without action
   */
  export type CategoriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
  }


  /**
   * Model SubCategoria
   */

  export type AggregateSubCategoria = {
    _count: SubCategoriaCountAggregateOutputType | null
    _avg: SubCategoriaAvgAggregateOutputType | null
    _sum: SubCategoriaSumAggregateOutputType | null
    _min: SubCategoriaMinAggregateOutputType | null
    _max: SubCategoriaMaxAggregateOutputType | null
  }

  export type SubCategoriaAvgAggregateOutputType = {
    id_subcategoria: number | null
    id_categoria: number | null
  }

  export type SubCategoriaSumAggregateOutputType = {
    id_subcategoria: number | null
    id_categoria: number | null
  }

  export type SubCategoriaMinAggregateOutputType = {
    id_subcategoria: number | null
    nombre: string | null
    id_categoria: number | null
  }

  export type SubCategoriaMaxAggregateOutputType = {
    id_subcategoria: number | null
    nombre: string | null
    id_categoria: number | null
  }

  export type SubCategoriaCountAggregateOutputType = {
    id_subcategoria: number
    nombre: number
    id_categoria: number
    _all: number
  }


  export type SubCategoriaAvgAggregateInputType = {
    id_subcategoria?: true
    id_categoria?: true
  }

  export type SubCategoriaSumAggregateInputType = {
    id_subcategoria?: true
    id_categoria?: true
  }

  export type SubCategoriaMinAggregateInputType = {
    id_subcategoria?: true
    nombre?: true
    id_categoria?: true
  }

  export type SubCategoriaMaxAggregateInputType = {
    id_subcategoria?: true
    nombre?: true
    id_categoria?: true
  }

  export type SubCategoriaCountAggregateInputType = {
    id_subcategoria?: true
    nombre?: true
    id_categoria?: true
    _all?: true
  }

  export type SubCategoriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubCategoria to aggregate.
     */
    where?: SubCategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubCategorias to fetch.
     */
    orderBy?: SubCategoriaOrderByWithRelationInput | SubCategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubCategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubCategorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubCategorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubCategorias
    **/
    _count?: true | SubCategoriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubCategoriaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubCategoriaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubCategoriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubCategoriaMaxAggregateInputType
  }

  export type GetSubCategoriaAggregateType<T extends SubCategoriaAggregateArgs> = {
        [P in keyof T & keyof AggregateSubCategoria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubCategoria[P]>
      : GetScalarType<T[P], AggregateSubCategoria[P]>
  }




  export type SubCategoriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubCategoriaWhereInput
    orderBy?: SubCategoriaOrderByWithAggregationInput | SubCategoriaOrderByWithAggregationInput[]
    by: SubCategoriaScalarFieldEnum[] | SubCategoriaScalarFieldEnum
    having?: SubCategoriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubCategoriaCountAggregateInputType | true
    _avg?: SubCategoriaAvgAggregateInputType
    _sum?: SubCategoriaSumAggregateInputType
    _min?: SubCategoriaMinAggregateInputType
    _max?: SubCategoriaMaxAggregateInputType
  }

  export type SubCategoriaGroupByOutputType = {
    id_subcategoria: number
    nombre: string
    id_categoria: number
    _count: SubCategoriaCountAggregateOutputType | null
    _avg: SubCategoriaAvgAggregateOutputType | null
    _sum: SubCategoriaSumAggregateOutputType | null
    _min: SubCategoriaMinAggregateOutputType | null
    _max: SubCategoriaMaxAggregateOutputType | null
  }

  type GetSubCategoriaGroupByPayload<T extends SubCategoriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubCategoriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubCategoriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubCategoriaGroupByOutputType[P]>
            : GetScalarType<T[P], SubCategoriaGroupByOutputType[P]>
        }
      >
    >


  export type SubCategoriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_subcategoria?: boolean
    nombre?: boolean
    id_categoria?: boolean
    historial_analitico?: boolean | SubCategoria$historial_analiticoArgs<ExtArgs>
    productos?: boolean | SubCategoria$productosArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    _count?: boolean | SubCategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subCategoria"]>

  export type SubCategoriaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_subcategoria?: boolean
    nombre?: boolean
    id_categoria?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subCategoria"]>

  export type SubCategoriaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_subcategoria?: boolean
    nombre?: boolean
    id_categoria?: boolean
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subCategoria"]>

  export type SubCategoriaSelectScalar = {
    id_subcategoria?: boolean
    nombre?: boolean
    id_categoria?: boolean
  }

  export type SubCategoriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_subcategoria" | "nombre" | "id_categoria", ExtArgs["result"]["subCategoria"]>
  export type SubCategoriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    historial_analitico?: boolean | SubCategoria$historial_analiticoArgs<ExtArgs>
    productos?: boolean | SubCategoria$productosArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    _count?: boolean | SubCategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubCategoriaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }
  export type SubCategoriaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }

  export type $SubCategoriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubCategoria"
    objects: {
      historial_analitico: Prisma.$HistorialAnaliticoPayload<ExtArgs>[]
      productos: Prisma.$ProductoPayload<ExtArgs>[]
      categoria: Prisma.$CategoriaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_subcategoria: number
      nombre: string
      id_categoria: number
    }, ExtArgs["result"]["subCategoria"]>
    composites: {}
  }

  type SubCategoriaGetPayload<S extends boolean | null | undefined | SubCategoriaDefaultArgs> = $Result.GetResult<Prisma.$SubCategoriaPayload, S>

  type SubCategoriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubCategoriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubCategoriaCountAggregateInputType | true
    }

  export interface SubCategoriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubCategoria'], meta: { name: 'SubCategoria' } }
    /**
     * Find zero or one SubCategoria that matches the filter.
     * @param {SubCategoriaFindUniqueArgs} args - Arguments to find a SubCategoria
     * @example
     * // Get one SubCategoria
     * const subCategoria = await prisma.subCategoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubCategoriaFindUniqueArgs>(args: SelectSubset<T, SubCategoriaFindUniqueArgs<ExtArgs>>): Prisma__SubCategoriaClient<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubCategoria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubCategoriaFindUniqueOrThrowArgs} args - Arguments to find a SubCategoria
     * @example
     * // Get one SubCategoria
     * const subCategoria = await prisma.subCategoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubCategoriaFindUniqueOrThrowArgs>(args: SelectSubset<T, SubCategoriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubCategoriaClient<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubCategoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubCategoriaFindFirstArgs} args - Arguments to find a SubCategoria
     * @example
     * // Get one SubCategoria
     * const subCategoria = await prisma.subCategoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubCategoriaFindFirstArgs>(args?: SelectSubset<T, SubCategoriaFindFirstArgs<ExtArgs>>): Prisma__SubCategoriaClient<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubCategoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubCategoriaFindFirstOrThrowArgs} args - Arguments to find a SubCategoria
     * @example
     * // Get one SubCategoria
     * const subCategoria = await prisma.subCategoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubCategoriaFindFirstOrThrowArgs>(args?: SelectSubset<T, SubCategoriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubCategoriaClient<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubCategorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubCategoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubCategorias
     * const subCategorias = await prisma.subCategoria.findMany()
     * 
     * // Get first 10 SubCategorias
     * const subCategorias = await prisma.subCategoria.findMany({ take: 10 })
     * 
     * // Only select the `id_subcategoria`
     * const subCategoriaWithId_subcategoriaOnly = await prisma.subCategoria.findMany({ select: { id_subcategoria: true } })
     * 
     */
    findMany<T extends SubCategoriaFindManyArgs>(args?: SelectSubset<T, SubCategoriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubCategoria.
     * @param {SubCategoriaCreateArgs} args - Arguments to create a SubCategoria.
     * @example
     * // Create one SubCategoria
     * const SubCategoria = await prisma.subCategoria.create({
     *   data: {
     *     // ... data to create a SubCategoria
     *   }
     * })
     * 
     */
    create<T extends SubCategoriaCreateArgs>(args: SelectSubset<T, SubCategoriaCreateArgs<ExtArgs>>): Prisma__SubCategoriaClient<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubCategorias.
     * @param {SubCategoriaCreateManyArgs} args - Arguments to create many SubCategorias.
     * @example
     * // Create many SubCategorias
     * const subCategoria = await prisma.subCategoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubCategoriaCreateManyArgs>(args?: SelectSubset<T, SubCategoriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubCategorias and returns the data saved in the database.
     * @param {SubCategoriaCreateManyAndReturnArgs} args - Arguments to create many SubCategorias.
     * @example
     * // Create many SubCategorias
     * const subCategoria = await prisma.subCategoria.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubCategorias and only return the `id_subcategoria`
     * const subCategoriaWithId_subcategoriaOnly = await prisma.subCategoria.createManyAndReturn({
     *   select: { id_subcategoria: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubCategoriaCreateManyAndReturnArgs>(args?: SelectSubset<T, SubCategoriaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubCategoria.
     * @param {SubCategoriaDeleteArgs} args - Arguments to delete one SubCategoria.
     * @example
     * // Delete one SubCategoria
     * const SubCategoria = await prisma.subCategoria.delete({
     *   where: {
     *     // ... filter to delete one SubCategoria
     *   }
     * })
     * 
     */
    delete<T extends SubCategoriaDeleteArgs>(args: SelectSubset<T, SubCategoriaDeleteArgs<ExtArgs>>): Prisma__SubCategoriaClient<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubCategoria.
     * @param {SubCategoriaUpdateArgs} args - Arguments to update one SubCategoria.
     * @example
     * // Update one SubCategoria
     * const subCategoria = await prisma.subCategoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubCategoriaUpdateArgs>(args: SelectSubset<T, SubCategoriaUpdateArgs<ExtArgs>>): Prisma__SubCategoriaClient<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubCategorias.
     * @param {SubCategoriaDeleteManyArgs} args - Arguments to filter SubCategorias to delete.
     * @example
     * // Delete a few SubCategorias
     * const { count } = await prisma.subCategoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubCategoriaDeleteManyArgs>(args?: SelectSubset<T, SubCategoriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubCategorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubCategoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubCategorias
     * const subCategoria = await prisma.subCategoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubCategoriaUpdateManyArgs>(args: SelectSubset<T, SubCategoriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubCategorias and returns the data updated in the database.
     * @param {SubCategoriaUpdateManyAndReturnArgs} args - Arguments to update many SubCategorias.
     * @example
     * // Update many SubCategorias
     * const subCategoria = await prisma.subCategoria.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubCategorias and only return the `id_subcategoria`
     * const subCategoriaWithId_subcategoriaOnly = await prisma.subCategoria.updateManyAndReturn({
     *   select: { id_subcategoria: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubCategoriaUpdateManyAndReturnArgs>(args: SelectSubset<T, SubCategoriaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubCategoria.
     * @param {SubCategoriaUpsertArgs} args - Arguments to update or create a SubCategoria.
     * @example
     * // Update or create a SubCategoria
     * const subCategoria = await prisma.subCategoria.upsert({
     *   create: {
     *     // ... data to create a SubCategoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubCategoria we want to update
     *   }
     * })
     */
    upsert<T extends SubCategoriaUpsertArgs>(args: SelectSubset<T, SubCategoriaUpsertArgs<ExtArgs>>): Prisma__SubCategoriaClient<$Result.GetResult<Prisma.$SubCategoriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubCategorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubCategoriaCountArgs} args - Arguments to filter SubCategorias to count.
     * @example
     * // Count the number of SubCategorias
     * const count = await prisma.subCategoria.count({
     *   where: {
     *     // ... the filter for the SubCategorias we want to count
     *   }
     * })
    **/
    count<T extends SubCategoriaCountArgs>(
      args?: Subset<T, SubCategoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubCategoriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubCategoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubCategoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubCategoriaAggregateArgs>(args: Subset<T, SubCategoriaAggregateArgs>): Prisma.PrismaPromise<GetSubCategoriaAggregateType<T>>

    /**
     * Group by SubCategoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubCategoriaGroupByArgs} args - Group by arguments.
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
      T extends SubCategoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubCategoriaGroupByArgs['orderBy'] }
        : { orderBy?: SubCategoriaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubCategoriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubCategoriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubCategoria model
   */
  readonly fields: SubCategoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubCategoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubCategoriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    historial_analitico<T extends SubCategoria$historial_analiticoArgs<ExtArgs> = {}>(args?: Subset<T, SubCategoria$historial_analiticoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistorialAnaliticoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    productos<T extends SubCategoria$productosArgs<ExtArgs> = {}>(args?: Subset<T, SubCategoria$productosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categoria<T extends CategoriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoriaDefaultArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SubCategoria model
   */
  interface SubCategoriaFieldRefs {
    readonly id_subcategoria: FieldRef<"SubCategoria", 'Int'>
    readonly nombre: FieldRef<"SubCategoria", 'String'>
    readonly id_categoria: FieldRef<"SubCategoria", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SubCategoria findUnique
   */
  export type SubCategoriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaInclude<ExtArgs> | null
    /**
     * Filter, which SubCategoria to fetch.
     */
    where: SubCategoriaWhereUniqueInput
  }

  /**
   * SubCategoria findUniqueOrThrow
   */
  export type SubCategoriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaInclude<ExtArgs> | null
    /**
     * Filter, which SubCategoria to fetch.
     */
    where: SubCategoriaWhereUniqueInput
  }

  /**
   * SubCategoria findFirst
   */
  export type SubCategoriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaInclude<ExtArgs> | null
    /**
     * Filter, which SubCategoria to fetch.
     */
    where?: SubCategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubCategorias to fetch.
     */
    orderBy?: SubCategoriaOrderByWithRelationInput | SubCategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubCategorias.
     */
    cursor?: SubCategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubCategorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubCategorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubCategorias.
     */
    distinct?: SubCategoriaScalarFieldEnum | SubCategoriaScalarFieldEnum[]
  }

  /**
   * SubCategoria findFirstOrThrow
   */
  export type SubCategoriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaInclude<ExtArgs> | null
    /**
     * Filter, which SubCategoria to fetch.
     */
    where?: SubCategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubCategorias to fetch.
     */
    orderBy?: SubCategoriaOrderByWithRelationInput | SubCategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubCategorias.
     */
    cursor?: SubCategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubCategorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubCategorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubCategorias.
     */
    distinct?: SubCategoriaScalarFieldEnum | SubCategoriaScalarFieldEnum[]
  }

  /**
   * SubCategoria findMany
   */
  export type SubCategoriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaInclude<ExtArgs> | null
    /**
     * Filter, which SubCategorias to fetch.
     */
    where?: SubCategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubCategorias to fetch.
     */
    orderBy?: SubCategoriaOrderByWithRelationInput | SubCategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubCategorias.
     */
    cursor?: SubCategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubCategorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubCategorias.
     */
    skip?: number
    distinct?: SubCategoriaScalarFieldEnum | SubCategoriaScalarFieldEnum[]
  }

  /**
   * SubCategoria create
   */
  export type SubCategoriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaInclude<ExtArgs> | null
    /**
     * The data needed to create a SubCategoria.
     */
    data: XOR<SubCategoriaCreateInput, SubCategoriaUncheckedCreateInput>
  }

  /**
   * SubCategoria createMany
   */
  export type SubCategoriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubCategorias.
     */
    data: SubCategoriaCreateManyInput | SubCategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubCategoria createManyAndReturn
   */
  export type SubCategoriaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * The data used to create many SubCategorias.
     */
    data: SubCategoriaCreateManyInput | SubCategoriaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubCategoria update
   */
  export type SubCategoriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaInclude<ExtArgs> | null
    /**
     * The data needed to update a SubCategoria.
     */
    data: XOR<SubCategoriaUpdateInput, SubCategoriaUncheckedUpdateInput>
    /**
     * Choose, which SubCategoria to update.
     */
    where: SubCategoriaWhereUniqueInput
  }

  /**
   * SubCategoria updateMany
   */
  export type SubCategoriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubCategorias.
     */
    data: XOR<SubCategoriaUpdateManyMutationInput, SubCategoriaUncheckedUpdateManyInput>
    /**
     * Filter which SubCategorias to update
     */
    where?: SubCategoriaWhereInput
    /**
     * Limit how many SubCategorias to update.
     */
    limit?: number
  }

  /**
   * SubCategoria updateManyAndReturn
   */
  export type SubCategoriaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * The data used to update SubCategorias.
     */
    data: XOR<SubCategoriaUpdateManyMutationInput, SubCategoriaUncheckedUpdateManyInput>
    /**
     * Filter which SubCategorias to update
     */
    where?: SubCategoriaWhereInput
    /**
     * Limit how many SubCategorias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubCategoria upsert
   */
  export type SubCategoriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaInclude<ExtArgs> | null
    /**
     * The filter to search for the SubCategoria to update in case it exists.
     */
    where: SubCategoriaWhereUniqueInput
    /**
     * In case the SubCategoria found by the `where` argument doesn't exist, create a new SubCategoria with this data.
     */
    create: XOR<SubCategoriaCreateInput, SubCategoriaUncheckedCreateInput>
    /**
     * In case the SubCategoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubCategoriaUpdateInput, SubCategoriaUncheckedUpdateInput>
  }

  /**
   * SubCategoria delete
   */
  export type SubCategoriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaInclude<ExtArgs> | null
    /**
     * Filter which SubCategoria to delete.
     */
    where: SubCategoriaWhereUniqueInput
  }

  /**
   * SubCategoria deleteMany
   */
  export type SubCategoriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubCategorias to delete
     */
    where?: SubCategoriaWhereInput
    /**
     * Limit how many SubCategorias to delete.
     */
    limit?: number
  }

  /**
   * SubCategoria.historial_analitico
   */
  export type SubCategoria$historial_analiticoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistorialAnalitico
     */
    select?: HistorialAnaliticoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HistorialAnalitico
     */
    omit?: HistorialAnaliticoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistorialAnaliticoInclude<ExtArgs> | null
    where?: HistorialAnaliticoWhereInput
    orderBy?: HistorialAnaliticoOrderByWithRelationInput | HistorialAnaliticoOrderByWithRelationInput[]
    cursor?: HistorialAnaliticoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HistorialAnaliticoScalarFieldEnum | HistorialAnaliticoScalarFieldEnum[]
  }

  /**
   * SubCategoria.productos
   */
  export type SubCategoria$productosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    cursor?: ProductoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * SubCategoria without action
   */
  export type SubCategoriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubCategoria
     */
    select?: SubCategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubCategoria
     */
    omit?: SubCategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubCategoriaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    usuario: 'usuario',
    email: 'email',
    password: 'password',
    rol: 'rol',
    fecha_creacion: 'fecha_creacion'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const MeseroScalarFieldEnum: {
    id_mesero: 'id_mesero',
    nombre: 'nombre',
    turno: 'turno'
  };

  export type MeseroScalarFieldEnum = (typeof MeseroScalarFieldEnum)[keyof typeof MeseroScalarFieldEnum]


  export const MesaScalarFieldEnum: {
    id_mesa: 'id_mesa',
    numero_mesa: 'numero_mesa',
    capacidad: 'capacidad',
    estado: 'estado',
    junta_id_mesa: 'junta_id_mesa'
  };

  export type MesaScalarFieldEnum = (typeof MesaScalarFieldEnum)[keyof typeof MesaScalarFieldEnum]


  export const ProductoScalarFieldEnum: {
    id_producto: 'id_producto',
    nombre: 'nombre',
    precio: 'precio',
    id_categoria: 'id_categoria',
    id_subcategoria: 'id_subcategoria',
    descripcion: 'descripcion',
    tiempo_prep: 'tiempo_prep',
    pasos: 'pasos',
    activo: 'activo',
    eliminado: 'eliminado'
  };

  export type ProductoScalarFieldEnum = (typeof ProductoScalarFieldEnum)[keyof typeof ProductoScalarFieldEnum]


  export const AditamentoScalarFieldEnum: {
    id_aditamento: 'id_aditamento',
    nombre: 'nombre',
    precio: 'precio'
  };

  export type AditamentoScalarFieldEnum = (typeof AditamentoScalarFieldEnum)[keyof typeof AditamentoScalarFieldEnum]


  export const ProductoAditamentosScalarFieldEnum: {
    id_producto: 'id_producto',
    id_aditamento: 'id_aditamento'
  };

  export type ProductoAditamentosScalarFieldEnum = (typeof ProductoAditamentosScalarFieldEnum)[keyof typeof ProductoAditamentosScalarFieldEnum]


  export const ComandasScalarFieldEnum: {
    id_comanda: 'id_comanda',
    id_mesa: 'id_mesa',
    id_mesero: 'id_mesero',
    fecha_hora: 'fecha_hora',
    estado: 'estado',
    token: 'token',
    fecha_pagado: 'fecha_pagado',
    impuestos: 'impuestos',
    pagado: 'pagado',
    sub_total: 'sub_total',
    total: 'total',
    transaccion_id: 'transaccion_id',
    metodo_pago: 'metodo_pago'
  };

  export type ComandasScalarFieldEnum = (typeof ComandasScalarFieldEnum)[keyof typeof ComandasScalarFieldEnum]


  export const DetalleComandaScalarFieldEnum: {
    id_detalle: 'id_detalle',
    id_comanda: 'id_comanda',
    id_producto: 'id_producto',
    cantidad: 'cantidad',
    notas_especiales: 'notas_especiales',
    status: 'status',
    hora: 'hora'
  };

  export type DetalleComandaScalarFieldEnum = (typeof DetalleComandaScalarFieldEnum)[keyof typeof DetalleComandaScalarFieldEnum]


  export const ComandaAditamentosScalarFieldEnum: {
    id_detalle: 'id_detalle',
    id_aditamento: 'id_aditamento',
    confirmacion: 'confirmacion'
  };

  export type ComandaAditamentosScalarFieldEnum = (typeof ComandaAditamentosScalarFieldEnum)[keyof typeof ComandaAditamentosScalarFieldEnum]


  export const ProductoImagenScalarFieldEnum: {
    id_imagen: 'id_imagen',
    url: 'url',
    id_producto: 'id_producto'
  };

  export type ProductoImagenScalarFieldEnum = (typeof ProductoImagenScalarFieldEnum)[keyof typeof ProductoImagenScalarFieldEnum]


  export const HistorialAnaliticoScalarFieldEnum: {
    id_historial: 'id_historial',
    id_producto: 'id_producto',
    id_subcategoria: 'id_subcategoria',
    id_categoria: 'id_categoria',
    hora: 'hora',
    dia_semana: 'dia_semana',
    es_festivo: 'es_festivo',
    clima_id: 'clima_id',
    fecha_registro: 'fecha_registro'
  };

  export type HistorialAnaliticoScalarFieldEnum = (typeof HistorialAnaliticoScalarFieldEnum)[keyof typeof HistorialAnaliticoScalarFieldEnum]


  export const CategoriaScalarFieldEnum: {
    id_categoria: 'id_categoria',
    nombre: 'nombre'
  };

  export type CategoriaScalarFieldEnum = (typeof CategoriaScalarFieldEnum)[keyof typeof CategoriaScalarFieldEnum]


  export const SubCategoriaScalarFieldEnum: {
    id_subcategoria: 'id_subcategoria',
    nombre: 'nombre',
    id_categoria: 'id_categoria'
  };

  export type SubCategoriaScalarFieldEnum = (typeof SubCategoriaScalarFieldEnum)[keyof typeof SubCategoriaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    usuario?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: StringFilter<"Usuario"> | string
    fecha_creacion?: DateTimeNullableFilter<"Usuario"> | Date | string | null
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    usuario?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    fecha_creacion?: SortOrderInput | SortOrder
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    usuario?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    password?: StringFilter<"Usuario"> | string
    rol?: StringFilter<"Usuario"> | string
    fecha_creacion?: DateTimeNullableFilter<"Usuario"> | Date | string | null
  }, "id" | "usuario" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    usuario?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    fecha_creacion?: SortOrderInput | SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    usuario?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    password?: StringWithAggregatesFilter<"Usuario"> | string
    rol?: StringWithAggregatesFilter<"Usuario"> | string
    fecha_creacion?: DateTimeNullableWithAggregatesFilter<"Usuario"> | Date | string | null
  }

  export type MeseroWhereInput = {
    AND?: MeseroWhereInput | MeseroWhereInput[]
    OR?: MeseroWhereInput[]
    NOT?: MeseroWhereInput | MeseroWhereInput[]
    id_mesero?: IntFilter<"Mesero"> | number
    nombre?: StringFilter<"Mesero"> | string
    turno?: StringFilter<"Mesero"> | string
    comandas?: ComandasListRelationFilter
  }

  export type MeseroOrderByWithRelationInput = {
    id_mesero?: SortOrder
    nombre?: SortOrder
    turno?: SortOrder
    comandas?: ComandasOrderByRelationAggregateInput
  }

  export type MeseroWhereUniqueInput = Prisma.AtLeast<{
    id_mesero?: number
    AND?: MeseroWhereInput | MeseroWhereInput[]
    OR?: MeseroWhereInput[]
    NOT?: MeseroWhereInput | MeseroWhereInput[]
    nombre?: StringFilter<"Mesero"> | string
    turno?: StringFilter<"Mesero"> | string
    comandas?: ComandasListRelationFilter
  }, "id_mesero">

  export type MeseroOrderByWithAggregationInput = {
    id_mesero?: SortOrder
    nombre?: SortOrder
    turno?: SortOrder
    _count?: MeseroCountOrderByAggregateInput
    _avg?: MeseroAvgOrderByAggregateInput
    _max?: MeseroMaxOrderByAggregateInput
    _min?: MeseroMinOrderByAggregateInput
    _sum?: MeseroSumOrderByAggregateInput
  }

  export type MeseroScalarWhereWithAggregatesInput = {
    AND?: MeseroScalarWhereWithAggregatesInput | MeseroScalarWhereWithAggregatesInput[]
    OR?: MeseroScalarWhereWithAggregatesInput[]
    NOT?: MeseroScalarWhereWithAggregatesInput | MeseroScalarWhereWithAggregatesInput[]
    id_mesero?: IntWithAggregatesFilter<"Mesero"> | number
    nombre?: StringWithAggregatesFilter<"Mesero"> | string
    turno?: StringWithAggregatesFilter<"Mesero"> | string
  }

  export type MesaWhereInput = {
    AND?: MesaWhereInput | MesaWhereInput[]
    OR?: MesaWhereInput[]
    NOT?: MesaWhereInput | MesaWhereInput[]
    id_mesa?: IntFilter<"Mesa"> | number
    numero_mesa?: IntFilter<"Mesa"> | number
    capacidad?: IntFilter<"Mesa"> | number
    estado?: StringFilter<"Mesa"> | string
    junta_id_mesa?: IntNullableFilter<"Mesa"> | number | null
    comandas?: ComandasListRelationFilter
  }

  export type MesaOrderByWithRelationInput = {
    id_mesa?: SortOrder
    numero_mesa?: SortOrder
    capacidad?: SortOrder
    estado?: SortOrder
    junta_id_mesa?: SortOrderInput | SortOrder
    comandas?: ComandasOrderByRelationAggregateInput
  }

  export type MesaWhereUniqueInput = Prisma.AtLeast<{
    id_mesa?: number
    numero_mesa?: number
    AND?: MesaWhereInput | MesaWhereInput[]
    OR?: MesaWhereInput[]
    NOT?: MesaWhereInput | MesaWhereInput[]
    capacidad?: IntFilter<"Mesa"> | number
    estado?: StringFilter<"Mesa"> | string
    junta_id_mesa?: IntNullableFilter<"Mesa"> | number | null
    comandas?: ComandasListRelationFilter
  }, "id_mesa" | "numero_mesa">

  export type MesaOrderByWithAggregationInput = {
    id_mesa?: SortOrder
    numero_mesa?: SortOrder
    capacidad?: SortOrder
    estado?: SortOrder
    junta_id_mesa?: SortOrderInput | SortOrder
    _count?: MesaCountOrderByAggregateInput
    _avg?: MesaAvgOrderByAggregateInput
    _max?: MesaMaxOrderByAggregateInput
    _min?: MesaMinOrderByAggregateInput
    _sum?: MesaSumOrderByAggregateInput
  }

  export type MesaScalarWhereWithAggregatesInput = {
    AND?: MesaScalarWhereWithAggregatesInput | MesaScalarWhereWithAggregatesInput[]
    OR?: MesaScalarWhereWithAggregatesInput[]
    NOT?: MesaScalarWhereWithAggregatesInput | MesaScalarWhereWithAggregatesInput[]
    id_mesa?: IntWithAggregatesFilter<"Mesa"> | number
    numero_mesa?: IntWithAggregatesFilter<"Mesa"> | number
    capacidad?: IntWithAggregatesFilter<"Mesa"> | number
    estado?: StringWithAggregatesFilter<"Mesa"> | string
    junta_id_mesa?: IntNullableWithAggregatesFilter<"Mesa"> | number | null
  }

  export type ProductoWhereInput = {
    AND?: ProductoWhereInput | ProductoWhereInput[]
    OR?: ProductoWhereInput[]
    NOT?: ProductoWhereInput | ProductoWhereInput[]
    id_producto?: IntFilter<"Producto"> | number
    nombre?: StringFilter<"Producto"> | string
    precio?: DecimalFilter<"Producto"> | Decimal | DecimalJsLike | number | string
    id_categoria?: IntFilter<"Producto"> | number
    id_subcategoria?: IntFilter<"Producto"> | number
    descripcion?: StringNullableFilter<"Producto"> | string | null
    tiempo_prep?: IntFilter<"Producto"> | number
    pasos?: StringNullableFilter<"Producto"> | string | null
    activo?: BoolFilter<"Producto"> | boolean
    eliminado?: BoolFilter<"Producto"> | boolean
    detalles?: DetalleComandaListRelationFilter
    historial?: HistorialAnaliticoListRelationFilter
    aditamentos?: ProductoAditamentosListRelationFilter
    imagen?: ProductoImagenListRelationFilter
    categoriaRel?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    subcategoria?: XOR<SubCategoriaScalarRelationFilter, SubCategoriaWhereInput>
  }

  export type ProductoOrderByWithRelationInput = {
    id_producto?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    id_categoria?: SortOrder
    id_subcategoria?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    tiempo_prep?: SortOrder
    pasos?: SortOrderInput | SortOrder
    activo?: SortOrder
    eliminado?: SortOrder
    detalles?: DetalleComandaOrderByRelationAggregateInput
    historial?: HistorialAnaliticoOrderByRelationAggregateInput
    aditamentos?: ProductoAditamentosOrderByRelationAggregateInput
    imagen?: ProductoImagenOrderByRelationAggregateInput
    categoriaRel?: CategoriaOrderByWithRelationInput
    subcategoria?: SubCategoriaOrderByWithRelationInput
  }

  export type ProductoWhereUniqueInput = Prisma.AtLeast<{
    id_producto?: number
    AND?: ProductoWhereInput | ProductoWhereInput[]
    OR?: ProductoWhereInput[]
    NOT?: ProductoWhereInput | ProductoWhereInput[]
    nombre?: StringFilter<"Producto"> | string
    precio?: DecimalFilter<"Producto"> | Decimal | DecimalJsLike | number | string
    id_categoria?: IntFilter<"Producto"> | number
    id_subcategoria?: IntFilter<"Producto"> | number
    descripcion?: StringNullableFilter<"Producto"> | string | null
    tiempo_prep?: IntFilter<"Producto"> | number
    pasos?: StringNullableFilter<"Producto"> | string | null
    activo?: BoolFilter<"Producto"> | boolean
    eliminado?: BoolFilter<"Producto"> | boolean
    detalles?: DetalleComandaListRelationFilter
    historial?: HistorialAnaliticoListRelationFilter
    aditamentos?: ProductoAditamentosListRelationFilter
    imagen?: ProductoImagenListRelationFilter
    categoriaRel?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    subcategoria?: XOR<SubCategoriaScalarRelationFilter, SubCategoriaWhereInput>
  }, "id_producto">

  export type ProductoOrderByWithAggregationInput = {
    id_producto?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    id_categoria?: SortOrder
    id_subcategoria?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    tiempo_prep?: SortOrder
    pasos?: SortOrderInput | SortOrder
    activo?: SortOrder
    eliminado?: SortOrder
    _count?: ProductoCountOrderByAggregateInput
    _avg?: ProductoAvgOrderByAggregateInput
    _max?: ProductoMaxOrderByAggregateInput
    _min?: ProductoMinOrderByAggregateInput
    _sum?: ProductoSumOrderByAggregateInput
  }

  export type ProductoScalarWhereWithAggregatesInput = {
    AND?: ProductoScalarWhereWithAggregatesInput | ProductoScalarWhereWithAggregatesInput[]
    OR?: ProductoScalarWhereWithAggregatesInput[]
    NOT?: ProductoScalarWhereWithAggregatesInput | ProductoScalarWhereWithAggregatesInput[]
    id_producto?: IntWithAggregatesFilter<"Producto"> | number
    nombre?: StringWithAggregatesFilter<"Producto"> | string
    precio?: DecimalWithAggregatesFilter<"Producto"> | Decimal | DecimalJsLike | number | string
    id_categoria?: IntWithAggregatesFilter<"Producto"> | number
    id_subcategoria?: IntWithAggregatesFilter<"Producto"> | number
    descripcion?: StringNullableWithAggregatesFilter<"Producto"> | string | null
    tiempo_prep?: IntWithAggregatesFilter<"Producto"> | number
    pasos?: StringNullableWithAggregatesFilter<"Producto"> | string | null
    activo?: BoolWithAggregatesFilter<"Producto"> | boolean
    eliminado?: BoolWithAggregatesFilter<"Producto"> | boolean
  }

  export type AditamentoWhereInput = {
    AND?: AditamentoWhereInput | AditamentoWhereInput[]
    OR?: AditamentoWhereInput[]
    NOT?: AditamentoWhereInput | AditamentoWhereInput[]
    id_aditamento?: IntFilter<"Aditamento"> | number
    nombre?: StringFilter<"Aditamento"> | string
    precio?: FloatFilter<"Aditamento"> | number
    comandas?: ComandaAditamentosListRelationFilter
    productos?: ProductoAditamentosListRelationFilter
  }

  export type AditamentoOrderByWithRelationInput = {
    id_aditamento?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    comandas?: ComandaAditamentosOrderByRelationAggregateInput
    productos?: ProductoAditamentosOrderByRelationAggregateInput
  }

  export type AditamentoWhereUniqueInput = Prisma.AtLeast<{
    id_aditamento?: number
    AND?: AditamentoWhereInput | AditamentoWhereInput[]
    OR?: AditamentoWhereInput[]
    NOT?: AditamentoWhereInput | AditamentoWhereInput[]
    nombre?: StringFilter<"Aditamento"> | string
    precio?: FloatFilter<"Aditamento"> | number
    comandas?: ComandaAditamentosListRelationFilter
    productos?: ProductoAditamentosListRelationFilter
  }, "id_aditamento">

  export type AditamentoOrderByWithAggregationInput = {
    id_aditamento?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    _count?: AditamentoCountOrderByAggregateInput
    _avg?: AditamentoAvgOrderByAggregateInput
    _max?: AditamentoMaxOrderByAggregateInput
    _min?: AditamentoMinOrderByAggregateInput
    _sum?: AditamentoSumOrderByAggregateInput
  }

  export type AditamentoScalarWhereWithAggregatesInput = {
    AND?: AditamentoScalarWhereWithAggregatesInput | AditamentoScalarWhereWithAggregatesInput[]
    OR?: AditamentoScalarWhereWithAggregatesInput[]
    NOT?: AditamentoScalarWhereWithAggregatesInput | AditamentoScalarWhereWithAggregatesInput[]
    id_aditamento?: IntWithAggregatesFilter<"Aditamento"> | number
    nombre?: StringWithAggregatesFilter<"Aditamento"> | string
    precio?: FloatWithAggregatesFilter<"Aditamento"> | number
  }

  export type ProductoAditamentosWhereInput = {
    AND?: ProductoAditamentosWhereInput | ProductoAditamentosWhereInput[]
    OR?: ProductoAditamentosWhereInput[]
    NOT?: ProductoAditamentosWhereInput | ProductoAditamentosWhereInput[]
    id_producto?: IntFilter<"ProductoAditamentos"> | number
    id_aditamento?: IntFilter<"ProductoAditamentos"> | number
    aditamento?: XOR<AditamentoScalarRelationFilter, AditamentoWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }

  export type ProductoAditamentosOrderByWithRelationInput = {
    id_producto?: SortOrder
    id_aditamento?: SortOrder
    aditamento?: AditamentoOrderByWithRelationInput
    producto?: ProductoOrderByWithRelationInput
  }

  export type ProductoAditamentosWhereUniqueInput = Prisma.AtLeast<{
    id_producto_id_aditamento?: ProductoAditamentosId_productoId_aditamentoCompoundUniqueInput
    AND?: ProductoAditamentosWhereInput | ProductoAditamentosWhereInput[]
    OR?: ProductoAditamentosWhereInput[]
    NOT?: ProductoAditamentosWhereInput | ProductoAditamentosWhereInput[]
    id_producto?: IntFilter<"ProductoAditamentos"> | number
    id_aditamento?: IntFilter<"ProductoAditamentos"> | number
    aditamento?: XOR<AditamentoScalarRelationFilter, AditamentoWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }, "id_producto_id_aditamento">

  export type ProductoAditamentosOrderByWithAggregationInput = {
    id_producto?: SortOrder
    id_aditamento?: SortOrder
    _count?: ProductoAditamentosCountOrderByAggregateInput
    _avg?: ProductoAditamentosAvgOrderByAggregateInput
    _max?: ProductoAditamentosMaxOrderByAggregateInput
    _min?: ProductoAditamentosMinOrderByAggregateInput
    _sum?: ProductoAditamentosSumOrderByAggregateInput
  }

  export type ProductoAditamentosScalarWhereWithAggregatesInput = {
    AND?: ProductoAditamentosScalarWhereWithAggregatesInput | ProductoAditamentosScalarWhereWithAggregatesInput[]
    OR?: ProductoAditamentosScalarWhereWithAggregatesInput[]
    NOT?: ProductoAditamentosScalarWhereWithAggregatesInput | ProductoAditamentosScalarWhereWithAggregatesInput[]
    id_producto?: IntWithAggregatesFilter<"ProductoAditamentos"> | number
    id_aditamento?: IntWithAggregatesFilter<"ProductoAditamentos"> | number
  }

  export type ComandasWhereInput = {
    AND?: ComandasWhereInput | ComandasWhereInput[]
    OR?: ComandasWhereInput[]
    NOT?: ComandasWhereInput | ComandasWhereInput[]
    id_comanda?: IntFilter<"Comandas"> | number
    id_mesa?: IntFilter<"Comandas"> | number
    id_mesero?: IntFilter<"Comandas"> | number
    fecha_hora?: DateTimeNullableFilter<"Comandas"> | Date | string | null
    estado?: StringFilter<"Comandas"> | string
    token?: StringNullableFilter<"Comandas"> | string | null
    fecha_pagado?: DateTimeNullableFilter<"Comandas"> | Date | string | null
    impuestos?: FloatFilter<"Comandas"> | number
    pagado?: BoolFilter<"Comandas"> | boolean
    sub_total?: FloatFilter<"Comandas"> | number
    total?: FloatFilter<"Comandas"> | number
    transaccion_id?: StringNullableFilter<"Comandas"> | string | null
    metodo_pago?: StringNullableFilter<"Comandas"> | string | null
    mesa?: XOR<MesaScalarRelationFilter, MesaWhereInput>
    mesero?: XOR<MeseroScalarRelationFilter, MeseroWhereInput>
    detalles?: DetalleComandaListRelationFilter
  }

  export type ComandasOrderByWithRelationInput = {
    id_comanda?: SortOrder
    id_mesa?: SortOrder
    id_mesero?: SortOrder
    fecha_hora?: SortOrderInput | SortOrder
    estado?: SortOrder
    token?: SortOrderInput | SortOrder
    fecha_pagado?: SortOrderInput | SortOrder
    impuestos?: SortOrder
    pagado?: SortOrder
    sub_total?: SortOrder
    total?: SortOrder
    transaccion_id?: SortOrderInput | SortOrder
    metodo_pago?: SortOrderInput | SortOrder
    mesa?: MesaOrderByWithRelationInput
    mesero?: MeseroOrderByWithRelationInput
    detalles?: DetalleComandaOrderByRelationAggregateInput
  }

  export type ComandasWhereUniqueInput = Prisma.AtLeast<{
    id_comanda?: number
    AND?: ComandasWhereInput | ComandasWhereInput[]
    OR?: ComandasWhereInput[]
    NOT?: ComandasWhereInput | ComandasWhereInput[]
    id_mesa?: IntFilter<"Comandas"> | number
    id_mesero?: IntFilter<"Comandas"> | number
    fecha_hora?: DateTimeNullableFilter<"Comandas"> | Date | string | null
    estado?: StringFilter<"Comandas"> | string
    token?: StringNullableFilter<"Comandas"> | string | null
    fecha_pagado?: DateTimeNullableFilter<"Comandas"> | Date | string | null
    impuestos?: FloatFilter<"Comandas"> | number
    pagado?: BoolFilter<"Comandas"> | boolean
    sub_total?: FloatFilter<"Comandas"> | number
    total?: FloatFilter<"Comandas"> | number
    transaccion_id?: StringNullableFilter<"Comandas"> | string | null
    metodo_pago?: StringNullableFilter<"Comandas"> | string | null
    mesa?: XOR<MesaScalarRelationFilter, MesaWhereInput>
    mesero?: XOR<MeseroScalarRelationFilter, MeseroWhereInput>
    detalles?: DetalleComandaListRelationFilter
  }, "id_comanda">

  export type ComandasOrderByWithAggregationInput = {
    id_comanda?: SortOrder
    id_mesa?: SortOrder
    id_mesero?: SortOrder
    fecha_hora?: SortOrderInput | SortOrder
    estado?: SortOrder
    token?: SortOrderInput | SortOrder
    fecha_pagado?: SortOrderInput | SortOrder
    impuestos?: SortOrder
    pagado?: SortOrder
    sub_total?: SortOrder
    total?: SortOrder
    transaccion_id?: SortOrderInput | SortOrder
    metodo_pago?: SortOrderInput | SortOrder
    _count?: ComandasCountOrderByAggregateInput
    _avg?: ComandasAvgOrderByAggregateInput
    _max?: ComandasMaxOrderByAggregateInput
    _min?: ComandasMinOrderByAggregateInput
    _sum?: ComandasSumOrderByAggregateInput
  }

  export type ComandasScalarWhereWithAggregatesInput = {
    AND?: ComandasScalarWhereWithAggregatesInput | ComandasScalarWhereWithAggregatesInput[]
    OR?: ComandasScalarWhereWithAggregatesInput[]
    NOT?: ComandasScalarWhereWithAggregatesInput | ComandasScalarWhereWithAggregatesInput[]
    id_comanda?: IntWithAggregatesFilter<"Comandas"> | number
    id_mesa?: IntWithAggregatesFilter<"Comandas"> | number
    id_mesero?: IntWithAggregatesFilter<"Comandas"> | number
    fecha_hora?: DateTimeNullableWithAggregatesFilter<"Comandas"> | Date | string | null
    estado?: StringWithAggregatesFilter<"Comandas"> | string
    token?: StringNullableWithAggregatesFilter<"Comandas"> | string | null
    fecha_pagado?: DateTimeNullableWithAggregatesFilter<"Comandas"> | Date | string | null
    impuestos?: FloatWithAggregatesFilter<"Comandas"> | number
    pagado?: BoolWithAggregatesFilter<"Comandas"> | boolean
    sub_total?: FloatWithAggregatesFilter<"Comandas"> | number
    total?: FloatWithAggregatesFilter<"Comandas"> | number
    transaccion_id?: StringNullableWithAggregatesFilter<"Comandas"> | string | null
    metodo_pago?: StringNullableWithAggregatesFilter<"Comandas"> | string | null
  }

  export type DetalleComandaWhereInput = {
    AND?: DetalleComandaWhereInput | DetalleComandaWhereInput[]
    OR?: DetalleComandaWhereInput[]
    NOT?: DetalleComandaWhereInput | DetalleComandaWhereInput[]
    id_detalle?: IntFilter<"DetalleComanda"> | number
    id_comanda?: IntFilter<"DetalleComanda"> | number
    id_producto?: IntFilter<"DetalleComanda"> | number
    cantidad?: IntFilter<"DetalleComanda"> | number
    notas_especiales?: StringNullableFilter<"DetalleComanda"> | string | null
    status?: StringFilter<"DetalleComanda"> | string
    hora?: IntNullableFilter<"DetalleComanda"> | number | null
    aditamentos?: ComandaAditamentosListRelationFilter
    comanda?: XOR<ComandasScalarRelationFilter, ComandasWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }

  export type DetalleComandaOrderByWithRelationInput = {
    id_detalle?: SortOrder
    id_comanda?: SortOrder
    id_producto?: SortOrder
    cantidad?: SortOrder
    notas_especiales?: SortOrderInput | SortOrder
    status?: SortOrder
    hora?: SortOrderInput | SortOrder
    aditamentos?: ComandaAditamentosOrderByRelationAggregateInput
    comanda?: ComandasOrderByWithRelationInput
    producto?: ProductoOrderByWithRelationInput
  }

  export type DetalleComandaWhereUniqueInput = Prisma.AtLeast<{
    id_detalle?: number
    AND?: DetalleComandaWhereInput | DetalleComandaWhereInput[]
    OR?: DetalleComandaWhereInput[]
    NOT?: DetalleComandaWhereInput | DetalleComandaWhereInput[]
    id_comanda?: IntFilter<"DetalleComanda"> | number
    id_producto?: IntFilter<"DetalleComanda"> | number
    cantidad?: IntFilter<"DetalleComanda"> | number
    notas_especiales?: StringNullableFilter<"DetalleComanda"> | string | null
    status?: StringFilter<"DetalleComanda"> | string
    hora?: IntNullableFilter<"DetalleComanda"> | number | null
    aditamentos?: ComandaAditamentosListRelationFilter
    comanda?: XOR<ComandasScalarRelationFilter, ComandasWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }, "id_detalle">

  export type DetalleComandaOrderByWithAggregationInput = {
    id_detalle?: SortOrder
    id_comanda?: SortOrder
    id_producto?: SortOrder
    cantidad?: SortOrder
    notas_especiales?: SortOrderInput | SortOrder
    status?: SortOrder
    hora?: SortOrderInput | SortOrder
    _count?: DetalleComandaCountOrderByAggregateInput
    _avg?: DetalleComandaAvgOrderByAggregateInput
    _max?: DetalleComandaMaxOrderByAggregateInput
    _min?: DetalleComandaMinOrderByAggregateInput
    _sum?: DetalleComandaSumOrderByAggregateInput
  }

  export type DetalleComandaScalarWhereWithAggregatesInput = {
    AND?: DetalleComandaScalarWhereWithAggregatesInput | DetalleComandaScalarWhereWithAggregatesInput[]
    OR?: DetalleComandaScalarWhereWithAggregatesInput[]
    NOT?: DetalleComandaScalarWhereWithAggregatesInput | DetalleComandaScalarWhereWithAggregatesInput[]
    id_detalle?: IntWithAggregatesFilter<"DetalleComanda"> | number
    id_comanda?: IntWithAggregatesFilter<"DetalleComanda"> | number
    id_producto?: IntWithAggregatesFilter<"DetalleComanda"> | number
    cantidad?: IntWithAggregatesFilter<"DetalleComanda"> | number
    notas_especiales?: StringNullableWithAggregatesFilter<"DetalleComanda"> | string | null
    status?: StringWithAggregatesFilter<"DetalleComanda"> | string
    hora?: IntNullableWithAggregatesFilter<"DetalleComanda"> | number | null
  }

  export type ComandaAditamentosWhereInput = {
    AND?: ComandaAditamentosWhereInput | ComandaAditamentosWhereInput[]
    OR?: ComandaAditamentosWhereInput[]
    NOT?: ComandaAditamentosWhereInput | ComandaAditamentosWhereInput[]
    id_detalle?: IntFilter<"ComandaAditamentos"> | number
    id_aditamento?: IntFilter<"ComandaAditamentos"> | number
    confirmacion?: BoolFilter<"ComandaAditamentos"> | boolean
    aditamento?: XOR<AditamentoScalarRelationFilter, AditamentoWhereInput>
    detalle?: XOR<DetalleComandaScalarRelationFilter, DetalleComandaWhereInput>
  }

  export type ComandaAditamentosOrderByWithRelationInput = {
    id_detalle?: SortOrder
    id_aditamento?: SortOrder
    confirmacion?: SortOrder
    aditamento?: AditamentoOrderByWithRelationInput
    detalle?: DetalleComandaOrderByWithRelationInput
  }

  export type ComandaAditamentosWhereUniqueInput = Prisma.AtLeast<{
    id_detalle_id_aditamento?: ComandaAditamentosId_detalleId_aditamentoCompoundUniqueInput
    AND?: ComandaAditamentosWhereInput | ComandaAditamentosWhereInput[]
    OR?: ComandaAditamentosWhereInput[]
    NOT?: ComandaAditamentosWhereInput | ComandaAditamentosWhereInput[]
    id_detalle?: IntFilter<"ComandaAditamentos"> | number
    id_aditamento?: IntFilter<"ComandaAditamentos"> | number
    confirmacion?: BoolFilter<"ComandaAditamentos"> | boolean
    aditamento?: XOR<AditamentoScalarRelationFilter, AditamentoWhereInput>
    detalle?: XOR<DetalleComandaScalarRelationFilter, DetalleComandaWhereInput>
  }, "id_detalle_id_aditamento">

  export type ComandaAditamentosOrderByWithAggregationInput = {
    id_detalle?: SortOrder
    id_aditamento?: SortOrder
    confirmacion?: SortOrder
    _count?: ComandaAditamentosCountOrderByAggregateInput
    _avg?: ComandaAditamentosAvgOrderByAggregateInput
    _max?: ComandaAditamentosMaxOrderByAggregateInput
    _min?: ComandaAditamentosMinOrderByAggregateInput
    _sum?: ComandaAditamentosSumOrderByAggregateInput
  }

  export type ComandaAditamentosScalarWhereWithAggregatesInput = {
    AND?: ComandaAditamentosScalarWhereWithAggregatesInput | ComandaAditamentosScalarWhereWithAggregatesInput[]
    OR?: ComandaAditamentosScalarWhereWithAggregatesInput[]
    NOT?: ComandaAditamentosScalarWhereWithAggregatesInput | ComandaAditamentosScalarWhereWithAggregatesInput[]
    id_detalle?: IntWithAggregatesFilter<"ComandaAditamentos"> | number
    id_aditamento?: IntWithAggregatesFilter<"ComandaAditamentos"> | number
    confirmacion?: BoolWithAggregatesFilter<"ComandaAditamentos"> | boolean
  }

  export type ProductoImagenWhereInput = {
    AND?: ProductoImagenWhereInput | ProductoImagenWhereInput[]
    OR?: ProductoImagenWhereInput[]
    NOT?: ProductoImagenWhereInput | ProductoImagenWhereInput[]
    id_imagen?: IntFilter<"ProductoImagen"> | number
    url?: StringFilter<"ProductoImagen"> | string
    id_producto?: IntFilter<"ProductoImagen"> | number
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }

  export type ProductoImagenOrderByWithRelationInput = {
    id_imagen?: SortOrder
    url?: SortOrder
    id_producto?: SortOrder
    producto?: ProductoOrderByWithRelationInput
  }

  export type ProductoImagenWhereUniqueInput = Prisma.AtLeast<{
    id_imagen?: number
    AND?: ProductoImagenWhereInput | ProductoImagenWhereInput[]
    OR?: ProductoImagenWhereInput[]
    NOT?: ProductoImagenWhereInput | ProductoImagenWhereInput[]
    url?: StringFilter<"ProductoImagen"> | string
    id_producto?: IntFilter<"ProductoImagen"> | number
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }, "id_imagen">

  export type ProductoImagenOrderByWithAggregationInput = {
    id_imagen?: SortOrder
    url?: SortOrder
    id_producto?: SortOrder
    _count?: ProductoImagenCountOrderByAggregateInput
    _avg?: ProductoImagenAvgOrderByAggregateInput
    _max?: ProductoImagenMaxOrderByAggregateInput
    _min?: ProductoImagenMinOrderByAggregateInput
    _sum?: ProductoImagenSumOrderByAggregateInput
  }

  export type ProductoImagenScalarWhereWithAggregatesInput = {
    AND?: ProductoImagenScalarWhereWithAggregatesInput | ProductoImagenScalarWhereWithAggregatesInput[]
    OR?: ProductoImagenScalarWhereWithAggregatesInput[]
    NOT?: ProductoImagenScalarWhereWithAggregatesInput | ProductoImagenScalarWhereWithAggregatesInput[]
    id_imagen?: IntWithAggregatesFilter<"ProductoImagen"> | number
    url?: StringWithAggregatesFilter<"ProductoImagen"> | string
    id_producto?: IntWithAggregatesFilter<"ProductoImagen"> | number
  }

  export type HistorialAnaliticoWhereInput = {
    AND?: HistorialAnaliticoWhereInput | HistorialAnaliticoWhereInput[]
    OR?: HistorialAnaliticoWhereInput[]
    NOT?: HistorialAnaliticoWhereInput | HistorialAnaliticoWhereInput[]
    id_historial?: IntFilter<"HistorialAnalitico"> | number
    id_producto?: IntFilter<"HistorialAnalitico"> | number
    id_subcategoria?: IntFilter<"HistorialAnalitico"> | number
    id_categoria?: IntFilter<"HistorialAnalitico"> | number
    hora?: IntFilter<"HistorialAnalitico"> | number
    dia_semana?: IntFilter<"HistorialAnalitico"> | number
    es_festivo?: BoolFilter<"HistorialAnalitico"> | boolean
    clima_id?: IntFilter<"HistorialAnalitico"> | number
    fecha_registro?: DateTimeNullableFilter<"HistorialAnalitico"> | Date | string | null
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    subcategorias?: XOR<SubCategoriaScalarRelationFilter, SubCategoriaWhereInput>
  }

  export type HistorialAnaliticoOrderByWithRelationInput = {
    id_historial?: SortOrder
    id_producto?: SortOrder
    id_subcategoria?: SortOrder
    id_categoria?: SortOrder
    hora?: SortOrder
    dia_semana?: SortOrder
    es_festivo?: SortOrder
    clima_id?: SortOrder
    fecha_registro?: SortOrderInput | SortOrder
    categoria?: CategoriaOrderByWithRelationInput
    producto?: ProductoOrderByWithRelationInput
    subcategorias?: SubCategoriaOrderByWithRelationInput
  }

  export type HistorialAnaliticoWhereUniqueInput = Prisma.AtLeast<{
    id_historial?: number
    AND?: HistorialAnaliticoWhereInput | HistorialAnaliticoWhereInput[]
    OR?: HistorialAnaliticoWhereInput[]
    NOT?: HistorialAnaliticoWhereInput | HistorialAnaliticoWhereInput[]
    id_producto?: IntFilter<"HistorialAnalitico"> | number
    id_subcategoria?: IntFilter<"HistorialAnalitico"> | number
    id_categoria?: IntFilter<"HistorialAnalitico"> | number
    hora?: IntFilter<"HistorialAnalitico"> | number
    dia_semana?: IntFilter<"HistorialAnalitico"> | number
    es_festivo?: BoolFilter<"HistorialAnalitico"> | boolean
    clima_id?: IntFilter<"HistorialAnalitico"> | number
    fecha_registro?: DateTimeNullableFilter<"HistorialAnalitico"> | Date | string | null
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
    subcategorias?: XOR<SubCategoriaScalarRelationFilter, SubCategoriaWhereInput>
  }, "id_historial">

  export type HistorialAnaliticoOrderByWithAggregationInput = {
    id_historial?: SortOrder
    id_producto?: SortOrder
    id_subcategoria?: SortOrder
    id_categoria?: SortOrder
    hora?: SortOrder
    dia_semana?: SortOrder
    es_festivo?: SortOrder
    clima_id?: SortOrder
    fecha_registro?: SortOrderInput | SortOrder
    _count?: HistorialAnaliticoCountOrderByAggregateInput
    _avg?: HistorialAnaliticoAvgOrderByAggregateInput
    _max?: HistorialAnaliticoMaxOrderByAggregateInput
    _min?: HistorialAnaliticoMinOrderByAggregateInput
    _sum?: HistorialAnaliticoSumOrderByAggregateInput
  }

  export type HistorialAnaliticoScalarWhereWithAggregatesInput = {
    AND?: HistorialAnaliticoScalarWhereWithAggregatesInput | HistorialAnaliticoScalarWhereWithAggregatesInput[]
    OR?: HistorialAnaliticoScalarWhereWithAggregatesInput[]
    NOT?: HistorialAnaliticoScalarWhereWithAggregatesInput | HistorialAnaliticoScalarWhereWithAggregatesInput[]
    id_historial?: IntWithAggregatesFilter<"HistorialAnalitico"> | number
    id_producto?: IntWithAggregatesFilter<"HistorialAnalitico"> | number
    id_subcategoria?: IntWithAggregatesFilter<"HistorialAnalitico"> | number
    id_categoria?: IntWithAggregatesFilter<"HistorialAnalitico"> | number
    hora?: IntWithAggregatesFilter<"HistorialAnalitico"> | number
    dia_semana?: IntWithAggregatesFilter<"HistorialAnalitico"> | number
    es_festivo?: BoolWithAggregatesFilter<"HistorialAnalitico"> | boolean
    clima_id?: IntWithAggregatesFilter<"HistorialAnalitico"> | number
    fecha_registro?: DateTimeNullableWithAggregatesFilter<"HistorialAnalitico"> | Date | string | null
  }

  export type CategoriaWhereInput = {
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    id_categoria?: IntFilter<"Categoria"> | number
    nombre?: StringFilter<"Categoria"> | string
    historial?: HistorialAnaliticoListRelationFilter
    productos?: ProductoListRelationFilter
    subcategorias?: SubCategoriaListRelationFilter
  }

  export type CategoriaOrderByWithRelationInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    historial?: HistorialAnaliticoOrderByRelationAggregateInput
    productos?: ProductoOrderByRelationAggregateInput
    subcategorias?: SubCategoriaOrderByRelationAggregateInput
  }

  export type CategoriaWhereUniqueInput = Prisma.AtLeast<{
    id_categoria?: number
    nombre?: string
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    historial?: HistorialAnaliticoListRelationFilter
    productos?: ProductoListRelationFilter
    subcategorias?: SubCategoriaListRelationFilter
  }, "id_categoria" | "nombre">

  export type CategoriaOrderByWithAggregationInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    _count?: CategoriaCountOrderByAggregateInput
    _avg?: CategoriaAvgOrderByAggregateInput
    _max?: CategoriaMaxOrderByAggregateInput
    _min?: CategoriaMinOrderByAggregateInput
    _sum?: CategoriaSumOrderByAggregateInput
  }

  export type CategoriaScalarWhereWithAggregatesInput = {
    AND?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    OR?: CategoriaScalarWhereWithAggregatesInput[]
    NOT?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    id_categoria?: IntWithAggregatesFilter<"Categoria"> | number
    nombre?: StringWithAggregatesFilter<"Categoria"> | string
  }

  export type SubCategoriaWhereInput = {
    AND?: SubCategoriaWhereInput | SubCategoriaWhereInput[]
    OR?: SubCategoriaWhereInput[]
    NOT?: SubCategoriaWhereInput | SubCategoriaWhereInput[]
    id_subcategoria?: IntFilter<"SubCategoria"> | number
    nombre?: StringFilter<"SubCategoria"> | string
    id_categoria?: IntFilter<"SubCategoria"> | number
    historial_analitico?: HistorialAnaliticoListRelationFilter
    productos?: ProductoListRelationFilter
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
  }

  export type SubCategoriaOrderByWithRelationInput = {
    id_subcategoria?: SortOrder
    nombre?: SortOrder
    id_categoria?: SortOrder
    historial_analitico?: HistorialAnaliticoOrderByRelationAggregateInput
    productos?: ProductoOrderByRelationAggregateInput
    categoria?: CategoriaOrderByWithRelationInput
  }

  export type SubCategoriaWhereUniqueInput = Prisma.AtLeast<{
    id_subcategoria?: number
    AND?: SubCategoriaWhereInput | SubCategoriaWhereInput[]
    OR?: SubCategoriaWhereInput[]
    NOT?: SubCategoriaWhereInput | SubCategoriaWhereInput[]
    nombre?: StringFilter<"SubCategoria"> | string
    id_categoria?: IntFilter<"SubCategoria"> | number
    historial_analitico?: HistorialAnaliticoListRelationFilter
    productos?: ProductoListRelationFilter
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
  }, "id_subcategoria">

  export type SubCategoriaOrderByWithAggregationInput = {
    id_subcategoria?: SortOrder
    nombre?: SortOrder
    id_categoria?: SortOrder
    _count?: SubCategoriaCountOrderByAggregateInput
    _avg?: SubCategoriaAvgOrderByAggregateInput
    _max?: SubCategoriaMaxOrderByAggregateInput
    _min?: SubCategoriaMinOrderByAggregateInput
    _sum?: SubCategoriaSumOrderByAggregateInput
  }

  export type SubCategoriaScalarWhereWithAggregatesInput = {
    AND?: SubCategoriaScalarWhereWithAggregatesInput | SubCategoriaScalarWhereWithAggregatesInput[]
    OR?: SubCategoriaScalarWhereWithAggregatesInput[]
    NOT?: SubCategoriaScalarWhereWithAggregatesInput | SubCategoriaScalarWhereWithAggregatesInput[]
    id_subcategoria?: IntWithAggregatesFilter<"SubCategoria"> | number
    nombre?: StringWithAggregatesFilter<"SubCategoria"> | string
    id_categoria?: IntWithAggregatesFilter<"SubCategoria"> | number
  }

  export type UsuarioCreateInput = {
    usuario: string
    email: string
    password: string
    rol: string
    fecha_creacion?: Date | string | null
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    usuario: string
    email: string
    password: string
    rol: string
    fecha_creacion?: Date | string | null
  }

  export type UsuarioUpdateInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UsuarioCreateManyInput = {
    id?: number
    usuario: string
    email: string
    password: string
    rol: string
    fecha_creacion?: Date | string | null
  }

  export type UsuarioUpdateManyMutationInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuario?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MeseroCreateInput = {
    nombre: string
    turno: string
    comandas?: ComandasCreateNestedManyWithoutMeseroInput
  }

  export type MeseroUncheckedCreateInput = {
    id_mesero?: number
    nombre: string
    turno: string
    comandas?: ComandasUncheckedCreateNestedManyWithoutMeseroInput
  }

  export type MeseroUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    turno?: StringFieldUpdateOperationsInput | string
    comandas?: ComandasUpdateManyWithoutMeseroNestedInput
  }

  export type MeseroUncheckedUpdateInput = {
    id_mesero?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    turno?: StringFieldUpdateOperationsInput | string
    comandas?: ComandasUncheckedUpdateManyWithoutMeseroNestedInput
  }

  export type MeseroCreateManyInput = {
    id_mesero?: number
    nombre: string
    turno: string
  }

  export type MeseroUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    turno?: StringFieldUpdateOperationsInput | string
  }

  export type MeseroUncheckedUpdateManyInput = {
    id_mesero?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    turno?: StringFieldUpdateOperationsInput | string
  }

  export type MesaCreateInput = {
    numero_mesa: number
    capacidad?: number
    estado?: string
    junta_id_mesa?: number | null
    comandas?: ComandasCreateNestedManyWithoutMesaInput
  }

  export type MesaUncheckedCreateInput = {
    id_mesa?: number
    numero_mesa: number
    capacidad?: number
    estado?: string
    junta_id_mesa?: number | null
    comandas?: ComandasUncheckedCreateNestedManyWithoutMesaInput
  }

  export type MesaUpdateInput = {
    numero_mesa?: IntFieldUpdateOperationsInput | number
    capacidad?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    junta_id_mesa?: NullableIntFieldUpdateOperationsInput | number | null
    comandas?: ComandasUpdateManyWithoutMesaNestedInput
  }

  export type MesaUncheckedUpdateInput = {
    id_mesa?: IntFieldUpdateOperationsInput | number
    numero_mesa?: IntFieldUpdateOperationsInput | number
    capacidad?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    junta_id_mesa?: NullableIntFieldUpdateOperationsInput | number | null
    comandas?: ComandasUncheckedUpdateManyWithoutMesaNestedInput
  }

  export type MesaCreateManyInput = {
    id_mesa?: number
    numero_mesa: number
    capacidad?: number
    estado?: string
    junta_id_mesa?: number | null
  }

  export type MesaUpdateManyMutationInput = {
    numero_mesa?: IntFieldUpdateOperationsInput | number
    capacidad?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    junta_id_mesa?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MesaUncheckedUpdateManyInput = {
    id_mesa?: IntFieldUpdateOperationsInput | number
    numero_mesa?: IntFieldUpdateOperationsInput | number
    capacidad?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    junta_id_mesa?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductoCreateInput = {
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaCreateNestedManyWithoutProductoInput
    historial?: HistorialAnaliticoCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenCreateNestedManyWithoutProductoInput
    categoriaRel: CategoriaCreateNestedOneWithoutProductosInput
    subcategoria: SubCategoriaCreateNestedOneWithoutProductosInput
  }

  export type ProductoUncheckedCreateInput = {
    id_producto?: number
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    id_categoria: number
    id_subcategoria: number
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaUncheckedCreateNestedManyWithoutProductoInput
    historial?: HistorialAnaliticoUncheckedCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosUncheckedCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUpdateManyWithoutProductoNestedInput
    historial?: HistorialAnaliticoUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUpdateManyWithoutProductoNestedInput
    categoriaRel?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    subcategoria?: SubCategoriaUpdateOneRequiredWithoutProductosNestedInput
  }

  export type ProductoUncheckedUpdateInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_categoria?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUncheckedUpdateManyWithoutProductoNestedInput
    historial?: HistorialAnaliticoUncheckedUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUncheckedUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoCreateManyInput = {
    id_producto?: number
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    id_categoria: number
    id_subcategoria: number
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
  }

  export type ProductoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoUncheckedUpdateManyInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_categoria?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AditamentoCreateInput = {
    nombre: string
    precio?: number
    comandas?: ComandaAditamentosCreateNestedManyWithoutAditamentoInput
    productos?: ProductoAditamentosCreateNestedManyWithoutAditamentoInput
  }

  export type AditamentoUncheckedCreateInput = {
    id_aditamento?: number
    nombre: string
    precio?: number
    comandas?: ComandaAditamentosUncheckedCreateNestedManyWithoutAditamentoInput
    productos?: ProductoAditamentosUncheckedCreateNestedManyWithoutAditamentoInput
  }

  export type AditamentoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    comandas?: ComandaAditamentosUpdateManyWithoutAditamentoNestedInput
    productos?: ProductoAditamentosUpdateManyWithoutAditamentoNestedInput
  }

  export type AditamentoUncheckedUpdateInput = {
    id_aditamento?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    comandas?: ComandaAditamentosUncheckedUpdateManyWithoutAditamentoNestedInput
    productos?: ProductoAditamentosUncheckedUpdateManyWithoutAditamentoNestedInput
  }

  export type AditamentoCreateManyInput = {
    id_aditamento?: number
    nombre: string
    precio?: number
  }

  export type AditamentoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
  }

  export type AditamentoUncheckedUpdateManyInput = {
    id_aditamento?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductoAditamentosCreateInput = {
    aditamento: AditamentoCreateNestedOneWithoutProductosInput
    producto: ProductoCreateNestedOneWithoutAditamentosInput
  }

  export type ProductoAditamentosUncheckedCreateInput = {
    id_producto: number
    id_aditamento: number
  }

  export type ProductoAditamentosUpdateInput = {
    aditamento?: AditamentoUpdateOneRequiredWithoutProductosNestedInput
    producto?: ProductoUpdateOneRequiredWithoutAditamentosNestedInput
  }

  export type ProductoAditamentosUncheckedUpdateInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    id_aditamento?: IntFieldUpdateOperationsInput | number
  }

  export type ProductoAditamentosCreateManyInput = {
    id_producto: number
    id_aditamento: number
  }

  export type ProductoAditamentosUpdateManyMutationInput = {

  }

  export type ProductoAditamentosUncheckedUpdateManyInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    id_aditamento?: IntFieldUpdateOperationsInput | number
  }

  export type ComandasCreateInput = {
    fecha_hora?: Date | string | null
    estado?: string
    token?: string | null
    fecha_pagado?: Date | string | null
    impuestos?: number
    pagado?: boolean
    sub_total?: number
    total?: number
    transaccion_id?: string | null
    metodo_pago?: string | null
    mesa: MesaCreateNestedOneWithoutComandasInput
    mesero: MeseroCreateNestedOneWithoutComandasInput
    detalles?: DetalleComandaCreateNestedManyWithoutComandaInput
  }

  export type ComandasUncheckedCreateInput = {
    id_comanda?: number
    id_mesa: number
    id_mesero: number
    fecha_hora?: Date | string | null
    estado?: string
    token?: string | null
    fecha_pagado?: Date | string | null
    impuestos?: number
    pagado?: boolean
    sub_total?: number
    total?: number
    transaccion_id?: string | null
    metodo_pago?: string | null
    detalles?: DetalleComandaUncheckedCreateNestedManyWithoutComandaInput
  }

  export type ComandasUpdateInput = {
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    mesa?: MesaUpdateOneRequiredWithoutComandasNestedInput
    mesero?: MeseroUpdateOneRequiredWithoutComandasNestedInput
    detalles?: DetalleComandaUpdateManyWithoutComandaNestedInput
  }

  export type ComandasUncheckedUpdateInput = {
    id_comanda?: IntFieldUpdateOperationsInput | number
    id_mesa?: IntFieldUpdateOperationsInput | number
    id_mesero?: IntFieldUpdateOperationsInput | number
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    detalles?: DetalleComandaUncheckedUpdateManyWithoutComandaNestedInput
  }

  export type ComandasCreateManyInput = {
    id_comanda?: number
    id_mesa: number
    id_mesero: number
    fecha_hora?: Date | string | null
    estado?: string
    token?: string | null
    fecha_pagado?: Date | string | null
    impuestos?: number
    pagado?: boolean
    sub_total?: number
    total?: number
    transaccion_id?: string | null
    metodo_pago?: string | null
  }

  export type ComandasUpdateManyMutationInput = {
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComandasUncheckedUpdateManyInput = {
    id_comanda?: IntFieldUpdateOperationsInput | number
    id_mesa?: IntFieldUpdateOperationsInput | number
    id_mesero?: IntFieldUpdateOperationsInput | number
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DetalleComandaCreateInput = {
    cantidad?: number
    notas_especiales?: string | null
    status?: string
    hora?: number | null
    aditamentos?: ComandaAditamentosCreateNestedManyWithoutDetalleInput
    comanda: ComandasCreateNestedOneWithoutDetallesInput
    producto: ProductoCreateNestedOneWithoutDetallesInput
  }

  export type DetalleComandaUncheckedCreateInput = {
    id_detalle?: number
    id_comanda: number
    id_producto: number
    cantidad?: number
    notas_especiales?: string | null
    status?: string
    hora?: number | null
    aditamentos?: ComandaAditamentosUncheckedCreateNestedManyWithoutDetalleInput
  }

  export type DetalleComandaUpdateInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
    aditamentos?: ComandaAditamentosUpdateManyWithoutDetalleNestedInput
    comanda?: ComandasUpdateOneRequiredWithoutDetallesNestedInput
    producto?: ProductoUpdateOneRequiredWithoutDetallesNestedInput
  }

  export type DetalleComandaUncheckedUpdateInput = {
    id_detalle?: IntFieldUpdateOperationsInput | number
    id_comanda?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
    aditamentos?: ComandaAditamentosUncheckedUpdateManyWithoutDetalleNestedInput
  }

  export type DetalleComandaCreateManyInput = {
    id_detalle?: number
    id_comanda: number
    id_producto: number
    cantidad?: number
    notas_especiales?: string | null
    status?: string
    hora?: number | null
  }

  export type DetalleComandaUpdateManyMutationInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DetalleComandaUncheckedUpdateManyInput = {
    id_detalle?: IntFieldUpdateOperationsInput | number
    id_comanda?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ComandaAditamentosCreateInput = {
    confirmacion?: boolean
    aditamento: AditamentoCreateNestedOneWithoutComandasInput
    detalle: DetalleComandaCreateNestedOneWithoutAditamentosInput
  }

  export type ComandaAditamentosUncheckedCreateInput = {
    id_detalle: number
    id_aditamento: number
    confirmacion?: boolean
  }

  export type ComandaAditamentosUpdateInput = {
    confirmacion?: BoolFieldUpdateOperationsInput | boolean
    aditamento?: AditamentoUpdateOneRequiredWithoutComandasNestedInput
    detalle?: DetalleComandaUpdateOneRequiredWithoutAditamentosNestedInput
  }

  export type ComandaAditamentosUncheckedUpdateInput = {
    id_detalle?: IntFieldUpdateOperationsInput | number
    id_aditamento?: IntFieldUpdateOperationsInput | number
    confirmacion?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ComandaAditamentosCreateManyInput = {
    id_detalle: number
    id_aditamento: number
    confirmacion?: boolean
  }

  export type ComandaAditamentosUpdateManyMutationInput = {
    confirmacion?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ComandaAditamentosUncheckedUpdateManyInput = {
    id_detalle?: IntFieldUpdateOperationsInput | number
    id_aditamento?: IntFieldUpdateOperationsInput | number
    confirmacion?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoImagenCreateInput = {
    url: string
    producto: ProductoCreateNestedOneWithoutImagenInput
  }

  export type ProductoImagenUncheckedCreateInput = {
    id_imagen?: number
    url: string
    id_producto: number
  }

  export type ProductoImagenUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    producto?: ProductoUpdateOneRequiredWithoutImagenNestedInput
  }

  export type ProductoImagenUncheckedUpdateInput = {
    id_imagen?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    id_producto?: IntFieldUpdateOperationsInput | number
  }

  export type ProductoImagenCreateManyInput = {
    id_imagen?: number
    url: string
    id_producto: number
  }

  export type ProductoImagenUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
  }

  export type ProductoImagenUncheckedUpdateManyInput = {
    id_imagen?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    id_producto?: IntFieldUpdateOperationsInput | number
  }

  export type HistorialAnaliticoCreateInput = {
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
    categoria: CategoriaCreateNestedOneWithoutHistorialInput
    producto: ProductoCreateNestedOneWithoutHistorialInput
    subcategorias: SubCategoriaCreateNestedOneWithoutHistorial_analiticoInput
  }

  export type HistorialAnaliticoUncheckedCreateInput = {
    id_historial?: number
    id_producto: number
    id_subcategoria: number
    id_categoria: number
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
  }

  export type HistorialAnaliticoUpdateInput = {
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoria?: CategoriaUpdateOneRequiredWithoutHistorialNestedInput
    producto?: ProductoUpdateOneRequiredWithoutHistorialNestedInput
    subcategorias?: SubCategoriaUpdateOneRequiredWithoutHistorial_analiticoNestedInput
  }

  export type HistorialAnaliticoUncheckedUpdateInput = {
    id_historial?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    id_categoria?: IntFieldUpdateOperationsInput | number
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HistorialAnaliticoCreateManyInput = {
    id_historial?: number
    id_producto: number
    id_subcategoria: number
    id_categoria: number
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
  }

  export type HistorialAnaliticoUpdateManyMutationInput = {
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HistorialAnaliticoUncheckedUpdateManyInput = {
    id_historial?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    id_categoria?: IntFieldUpdateOperationsInput | number
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoriaCreateInput = {
    nombre: string
    historial?: HistorialAnaliticoCreateNestedManyWithoutCategoriaInput
    productos?: ProductoCreateNestedManyWithoutCategoriaRelInput
    subcategorias?: SubCategoriaCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateInput = {
    id_categoria?: number
    nombre: string
    historial?: HistorialAnaliticoUncheckedCreateNestedManyWithoutCategoriaInput
    productos?: ProductoUncheckedCreateNestedManyWithoutCategoriaRelInput
    subcategorias?: SubCategoriaUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    historial?: HistorialAnaliticoUpdateManyWithoutCategoriaNestedInput
    productos?: ProductoUpdateManyWithoutCategoriaRelNestedInput
    subcategorias?: SubCategoriaUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateInput = {
    id_categoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    historial?: HistorialAnaliticoUncheckedUpdateManyWithoutCategoriaNestedInput
    productos?: ProductoUncheckedUpdateManyWithoutCategoriaRelNestedInput
    subcategorias?: SubCategoriaUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaCreateManyInput = {
    id_categoria?: number
    nombre: string
  }

  export type CategoriaUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type CategoriaUncheckedUpdateManyInput = {
    id_categoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type SubCategoriaCreateInput = {
    nombre: string
    historial_analitico?: HistorialAnaliticoCreateNestedManyWithoutSubcategoriasInput
    productos?: ProductoCreateNestedManyWithoutSubcategoriaInput
    categoria: CategoriaCreateNestedOneWithoutSubcategoriasInput
  }

  export type SubCategoriaUncheckedCreateInput = {
    id_subcategoria?: number
    nombre: string
    id_categoria: number
    historial_analitico?: HistorialAnaliticoUncheckedCreateNestedManyWithoutSubcategoriasInput
    productos?: ProductoUncheckedCreateNestedManyWithoutSubcategoriaInput
  }

  export type SubCategoriaUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    historial_analitico?: HistorialAnaliticoUpdateManyWithoutSubcategoriasNestedInput
    productos?: ProductoUpdateManyWithoutSubcategoriaNestedInput
    categoria?: CategoriaUpdateOneRequiredWithoutSubcategoriasNestedInput
  }

  export type SubCategoriaUncheckedUpdateInput = {
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    id_categoria?: IntFieldUpdateOperationsInput | number
    historial_analitico?: HistorialAnaliticoUncheckedUpdateManyWithoutSubcategoriasNestedInput
    productos?: ProductoUncheckedUpdateManyWithoutSubcategoriaNestedInput
  }

  export type SubCategoriaCreateManyInput = {
    id_subcategoria?: number
    nombre: string
    id_categoria: number
  }

  export type SubCategoriaUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type SubCategoriaUncheckedUpdateManyInput = {
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    id_categoria?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
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

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    usuario?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    usuario?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    usuario?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ComandasListRelationFilter = {
    every?: ComandasWhereInput
    some?: ComandasWhereInput
    none?: ComandasWhereInput
  }

  export type ComandasOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MeseroCountOrderByAggregateInput = {
    id_mesero?: SortOrder
    nombre?: SortOrder
    turno?: SortOrder
  }

  export type MeseroAvgOrderByAggregateInput = {
    id_mesero?: SortOrder
  }

  export type MeseroMaxOrderByAggregateInput = {
    id_mesero?: SortOrder
    nombre?: SortOrder
    turno?: SortOrder
  }

  export type MeseroMinOrderByAggregateInput = {
    id_mesero?: SortOrder
    nombre?: SortOrder
    turno?: SortOrder
  }

  export type MeseroSumOrderByAggregateInput = {
    id_mesero?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MesaCountOrderByAggregateInput = {
    id_mesa?: SortOrder
    numero_mesa?: SortOrder
    capacidad?: SortOrder
    estado?: SortOrder
    junta_id_mesa?: SortOrder
  }

  export type MesaAvgOrderByAggregateInput = {
    id_mesa?: SortOrder
    numero_mesa?: SortOrder
    capacidad?: SortOrder
    junta_id_mesa?: SortOrder
  }

  export type MesaMaxOrderByAggregateInput = {
    id_mesa?: SortOrder
    numero_mesa?: SortOrder
    capacidad?: SortOrder
    estado?: SortOrder
    junta_id_mesa?: SortOrder
  }

  export type MesaMinOrderByAggregateInput = {
    id_mesa?: SortOrder
    numero_mesa?: SortOrder
    capacidad?: SortOrder
    estado?: SortOrder
    junta_id_mesa?: SortOrder
  }

  export type MesaSumOrderByAggregateInput = {
    id_mesa?: SortOrder
    numero_mesa?: SortOrder
    capacidad?: SortOrder
    junta_id_mesa?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DetalleComandaListRelationFilter = {
    every?: DetalleComandaWhereInput
    some?: DetalleComandaWhereInput
    none?: DetalleComandaWhereInput
  }

  export type HistorialAnaliticoListRelationFilter = {
    every?: HistorialAnaliticoWhereInput
    some?: HistorialAnaliticoWhereInput
    none?: HistorialAnaliticoWhereInput
  }

  export type ProductoAditamentosListRelationFilter = {
    every?: ProductoAditamentosWhereInput
    some?: ProductoAditamentosWhereInput
    none?: ProductoAditamentosWhereInput
  }

  export type ProductoImagenListRelationFilter = {
    every?: ProductoImagenWhereInput
    some?: ProductoImagenWhereInput
    none?: ProductoImagenWhereInput
  }

  export type CategoriaScalarRelationFilter = {
    is?: CategoriaWhereInput
    isNot?: CategoriaWhereInput
  }

  export type SubCategoriaScalarRelationFilter = {
    is?: SubCategoriaWhereInput
    isNot?: SubCategoriaWhereInput
  }

  export type DetalleComandaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HistorialAnaliticoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductoAditamentosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductoImagenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductoCountOrderByAggregateInput = {
    id_producto?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    id_categoria?: SortOrder
    id_subcategoria?: SortOrder
    descripcion?: SortOrder
    tiempo_prep?: SortOrder
    pasos?: SortOrder
    activo?: SortOrder
    eliminado?: SortOrder
  }

  export type ProductoAvgOrderByAggregateInput = {
    id_producto?: SortOrder
    precio?: SortOrder
    id_categoria?: SortOrder
    id_subcategoria?: SortOrder
    tiempo_prep?: SortOrder
  }

  export type ProductoMaxOrderByAggregateInput = {
    id_producto?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    id_categoria?: SortOrder
    id_subcategoria?: SortOrder
    descripcion?: SortOrder
    tiempo_prep?: SortOrder
    pasos?: SortOrder
    activo?: SortOrder
    eliminado?: SortOrder
  }

  export type ProductoMinOrderByAggregateInput = {
    id_producto?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
    id_categoria?: SortOrder
    id_subcategoria?: SortOrder
    descripcion?: SortOrder
    tiempo_prep?: SortOrder
    pasos?: SortOrder
    activo?: SortOrder
    eliminado?: SortOrder
  }

  export type ProductoSumOrderByAggregateInput = {
    id_producto?: SortOrder
    precio?: SortOrder
    id_categoria?: SortOrder
    id_subcategoria?: SortOrder
    tiempo_prep?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ComandaAditamentosListRelationFilter = {
    every?: ComandaAditamentosWhereInput
    some?: ComandaAditamentosWhereInput
    none?: ComandaAditamentosWhereInput
  }

  export type ComandaAditamentosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AditamentoCountOrderByAggregateInput = {
    id_aditamento?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
  }

  export type AditamentoAvgOrderByAggregateInput = {
    id_aditamento?: SortOrder
    precio?: SortOrder
  }

  export type AditamentoMaxOrderByAggregateInput = {
    id_aditamento?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
  }

  export type AditamentoMinOrderByAggregateInput = {
    id_aditamento?: SortOrder
    nombre?: SortOrder
    precio?: SortOrder
  }

  export type AditamentoSumOrderByAggregateInput = {
    id_aditamento?: SortOrder
    precio?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AditamentoScalarRelationFilter = {
    is?: AditamentoWhereInput
    isNot?: AditamentoWhereInput
  }

  export type ProductoScalarRelationFilter = {
    is?: ProductoWhereInput
    isNot?: ProductoWhereInput
  }

  export type ProductoAditamentosId_productoId_aditamentoCompoundUniqueInput = {
    id_producto: number
    id_aditamento: number
  }

  export type ProductoAditamentosCountOrderByAggregateInput = {
    id_producto?: SortOrder
    id_aditamento?: SortOrder
  }

  export type ProductoAditamentosAvgOrderByAggregateInput = {
    id_producto?: SortOrder
    id_aditamento?: SortOrder
  }

  export type ProductoAditamentosMaxOrderByAggregateInput = {
    id_producto?: SortOrder
    id_aditamento?: SortOrder
  }

  export type ProductoAditamentosMinOrderByAggregateInput = {
    id_producto?: SortOrder
    id_aditamento?: SortOrder
  }

  export type ProductoAditamentosSumOrderByAggregateInput = {
    id_producto?: SortOrder
    id_aditamento?: SortOrder
  }

  export type MesaScalarRelationFilter = {
    is?: MesaWhereInput
    isNot?: MesaWhereInput
  }

  export type MeseroScalarRelationFilter = {
    is?: MeseroWhereInput
    isNot?: MeseroWhereInput
  }

  export type ComandasCountOrderByAggregateInput = {
    id_comanda?: SortOrder
    id_mesa?: SortOrder
    id_mesero?: SortOrder
    fecha_hora?: SortOrder
    estado?: SortOrder
    token?: SortOrder
    fecha_pagado?: SortOrder
    impuestos?: SortOrder
    pagado?: SortOrder
    sub_total?: SortOrder
    total?: SortOrder
    transaccion_id?: SortOrder
    metodo_pago?: SortOrder
  }

  export type ComandasAvgOrderByAggregateInput = {
    id_comanda?: SortOrder
    id_mesa?: SortOrder
    id_mesero?: SortOrder
    impuestos?: SortOrder
    sub_total?: SortOrder
    total?: SortOrder
  }

  export type ComandasMaxOrderByAggregateInput = {
    id_comanda?: SortOrder
    id_mesa?: SortOrder
    id_mesero?: SortOrder
    fecha_hora?: SortOrder
    estado?: SortOrder
    token?: SortOrder
    fecha_pagado?: SortOrder
    impuestos?: SortOrder
    pagado?: SortOrder
    sub_total?: SortOrder
    total?: SortOrder
    transaccion_id?: SortOrder
    metodo_pago?: SortOrder
  }

  export type ComandasMinOrderByAggregateInput = {
    id_comanda?: SortOrder
    id_mesa?: SortOrder
    id_mesero?: SortOrder
    fecha_hora?: SortOrder
    estado?: SortOrder
    token?: SortOrder
    fecha_pagado?: SortOrder
    impuestos?: SortOrder
    pagado?: SortOrder
    sub_total?: SortOrder
    total?: SortOrder
    transaccion_id?: SortOrder
    metodo_pago?: SortOrder
  }

  export type ComandasSumOrderByAggregateInput = {
    id_comanda?: SortOrder
    id_mesa?: SortOrder
    id_mesero?: SortOrder
    impuestos?: SortOrder
    sub_total?: SortOrder
    total?: SortOrder
  }

  export type ComandasScalarRelationFilter = {
    is?: ComandasWhereInput
    isNot?: ComandasWhereInput
  }

  export type DetalleComandaCountOrderByAggregateInput = {
    id_detalle?: SortOrder
    id_comanda?: SortOrder
    id_producto?: SortOrder
    cantidad?: SortOrder
    notas_especiales?: SortOrder
    status?: SortOrder
    hora?: SortOrder
  }

  export type DetalleComandaAvgOrderByAggregateInput = {
    id_detalle?: SortOrder
    id_comanda?: SortOrder
    id_producto?: SortOrder
    cantidad?: SortOrder
    hora?: SortOrder
  }

  export type DetalleComandaMaxOrderByAggregateInput = {
    id_detalle?: SortOrder
    id_comanda?: SortOrder
    id_producto?: SortOrder
    cantidad?: SortOrder
    notas_especiales?: SortOrder
    status?: SortOrder
    hora?: SortOrder
  }

  export type DetalleComandaMinOrderByAggregateInput = {
    id_detalle?: SortOrder
    id_comanda?: SortOrder
    id_producto?: SortOrder
    cantidad?: SortOrder
    notas_especiales?: SortOrder
    status?: SortOrder
    hora?: SortOrder
  }

  export type DetalleComandaSumOrderByAggregateInput = {
    id_detalle?: SortOrder
    id_comanda?: SortOrder
    id_producto?: SortOrder
    cantidad?: SortOrder
    hora?: SortOrder
  }

  export type DetalleComandaScalarRelationFilter = {
    is?: DetalleComandaWhereInput
    isNot?: DetalleComandaWhereInput
  }

  export type ComandaAditamentosId_detalleId_aditamentoCompoundUniqueInput = {
    id_detalle: number
    id_aditamento: number
  }

  export type ComandaAditamentosCountOrderByAggregateInput = {
    id_detalle?: SortOrder
    id_aditamento?: SortOrder
    confirmacion?: SortOrder
  }

  export type ComandaAditamentosAvgOrderByAggregateInput = {
    id_detalle?: SortOrder
    id_aditamento?: SortOrder
  }

  export type ComandaAditamentosMaxOrderByAggregateInput = {
    id_detalle?: SortOrder
    id_aditamento?: SortOrder
    confirmacion?: SortOrder
  }

  export type ComandaAditamentosMinOrderByAggregateInput = {
    id_detalle?: SortOrder
    id_aditamento?: SortOrder
    confirmacion?: SortOrder
  }

  export type ComandaAditamentosSumOrderByAggregateInput = {
    id_detalle?: SortOrder
    id_aditamento?: SortOrder
  }

  export type ProductoImagenCountOrderByAggregateInput = {
    id_imagen?: SortOrder
    url?: SortOrder
    id_producto?: SortOrder
  }

  export type ProductoImagenAvgOrderByAggregateInput = {
    id_imagen?: SortOrder
    id_producto?: SortOrder
  }

  export type ProductoImagenMaxOrderByAggregateInput = {
    id_imagen?: SortOrder
    url?: SortOrder
    id_producto?: SortOrder
  }

  export type ProductoImagenMinOrderByAggregateInput = {
    id_imagen?: SortOrder
    url?: SortOrder
    id_producto?: SortOrder
  }

  export type ProductoImagenSumOrderByAggregateInput = {
    id_imagen?: SortOrder
    id_producto?: SortOrder
  }

  export type HistorialAnaliticoCountOrderByAggregateInput = {
    id_historial?: SortOrder
    id_producto?: SortOrder
    id_subcategoria?: SortOrder
    id_categoria?: SortOrder
    hora?: SortOrder
    dia_semana?: SortOrder
    es_festivo?: SortOrder
    clima_id?: SortOrder
    fecha_registro?: SortOrder
  }

  export type HistorialAnaliticoAvgOrderByAggregateInput = {
    id_historial?: SortOrder
    id_producto?: SortOrder
    id_subcategoria?: SortOrder
    id_categoria?: SortOrder
    hora?: SortOrder
    dia_semana?: SortOrder
    clima_id?: SortOrder
  }

  export type HistorialAnaliticoMaxOrderByAggregateInput = {
    id_historial?: SortOrder
    id_producto?: SortOrder
    id_subcategoria?: SortOrder
    id_categoria?: SortOrder
    hora?: SortOrder
    dia_semana?: SortOrder
    es_festivo?: SortOrder
    clima_id?: SortOrder
    fecha_registro?: SortOrder
  }

  export type HistorialAnaliticoMinOrderByAggregateInput = {
    id_historial?: SortOrder
    id_producto?: SortOrder
    id_subcategoria?: SortOrder
    id_categoria?: SortOrder
    hora?: SortOrder
    dia_semana?: SortOrder
    es_festivo?: SortOrder
    clima_id?: SortOrder
    fecha_registro?: SortOrder
  }

  export type HistorialAnaliticoSumOrderByAggregateInput = {
    id_historial?: SortOrder
    id_producto?: SortOrder
    id_subcategoria?: SortOrder
    id_categoria?: SortOrder
    hora?: SortOrder
    dia_semana?: SortOrder
    clima_id?: SortOrder
  }

  export type ProductoListRelationFilter = {
    every?: ProductoWhereInput
    some?: ProductoWhereInput
    none?: ProductoWhereInput
  }

  export type SubCategoriaListRelationFilter = {
    every?: SubCategoriaWhereInput
    some?: SubCategoriaWhereInput
    none?: SubCategoriaWhereInput
  }

  export type ProductoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubCategoriaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoriaCountOrderByAggregateInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
  }

  export type CategoriaAvgOrderByAggregateInput = {
    id_categoria?: SortOrder
  }

  export type CategoriaMaxOrderByAggregateInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
  }

  export type CategoriaMinOrderByAggregateInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
  }

  export type CategoriaSumOrderByAggregateInput = {
    id_categoria?: SortOrder
  }

  export type SubCategoriaCountOrderByAggregateInput = {
    id_subcategoria?: SortOrder
    nombre?: SortOrder
    id_categoria?: SortOrder
  }

  export type SubCategoriaAvgOrderByAggregateInput = {
    id_subcategoria?: SortOrder
    id_categoria?: SortOrder
  }

  export type SubCategoriaMaxOrderByAggregateInput = {
    id_subcategoria?: SortOrder
    nombre?: SortOrder
    id_categoria?: SortOrder
  }

  export type SubCategoriaMinOrderByAggregateInput = {
    id_subcategoria?: SortOrder
    nombre?: SortOrder
    id_categoria?: SortOrder
  }

  export type SubCategoriaSumOrderByAggregateInput = {
    id_subcategoria?: SortOrder
    id_categoria?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ComandasCreateNestedManyWithoutMeseroInput = {
    create?: XOR<ComandasCreateWithoutMeseroInput, ComandasUncheckedCreateWithoutMeseroInput> | ComandasCreateWithoutMeseroInput[] | ComandasUncheckedCreateWithoutMeseroInput[]
    connectOrCreate?: ComandasCreateOrConnectWithoutMeseroInput | ComandasCreateOrConnectWithoutMeseroInput[]
    createMany?: ComandasCreateManyMeseroInputEnvelope
    connect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
  }

  export type ComandasUncheckedCreateNestedManyWithoutMeseroInput = {
    create?: XOR<ComandasCreateWithoutMeseroInput, ComandasUncheckedCreateWithoutMeseroInput> | ComandasCreateWithoutMeseroInput[] | ComandasUncheckedCreateWithoutMeseroInput[]
    connectOrCreate?: ComandasCreateOrConnectWithoutMeseroInput | ComandasCreateOrConnectWithoutMeseroInput[]
    createMany?: ComandasCreateManyMeseroInputEnvelope
    connect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
  }

  export type ComandasUpdateManyWithoutMeseroNestedInput = {
    create?: XOR<ComandasCreateWithoutMeseroInput, ComandasUncheckedCreateWithoutMeseroInput> | ComandasCreateWithoutMeseroInput[] | ComandasUncheckedCreateWithoutMeseroInput[]
    connectOrCreate?: ComandasCreateOrConnectWithoutMeseroInput | ComandasCreateOrConnectWithoutMeseroInput[]
    upsert?: ComandasUpsertWithWhereUniqueWithoutMeseroInput | ComandasUpsertWithWhereUniqueWithoutMeseroInput[]
    createMany?: ComandasCreateManyMeseroInputEnvelope
    set?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    disconnect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    delete?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    connect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    update?: ComandasUpdateWithWhereUniqueWithoutMeseroInput | ComandasUpdateWithWhereUniqueWithoutMeseroInput[]
    updateMany?: ComandasUpdateManyWithWhereWithoutMeseroInput | ComandasUpdateManyWithWhereWithoutMeseroInput[]
    deleteMany?: ComandasScalarWhereInput | ComandasScalarWhereInput[]
  }

  export type ComandasUncheckedUpdateManyWithoutMeseroNestedInput = {
    create?: XOR<ComandasCreateWithoutMeseroInput, ComandasUncheckedCreateWithoutMeseroInput> | ComandasCreateWithoutMeseroInput[] | ComandasUncheckedCreateWithoutMeseroInput[]
    connectOrCreate?: ComandasCreateOrConnectWithoutMeseroInput | ComandasCreateOrConnectWithoutMeseroInput[]
    upsert?: ComandasUpsertWithWhereUniqueWithoutMeseroInput | ComandasUpsertWithWhereUniqueWithoutMeseroInput[]
    createMany?: ComandasCreateManyMeseroInputEnvelope
    set?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    disconnect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    delete?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    connect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    update?: ComandasUpdateWithWhereUniqueWithoutMeseroInput | ComandasUpdateWithWhereUniqueWithoutMeseroInput[]
    updateMany?: ComandasUpdateManyWithWhereWithoutMeseroInput | ComandasUpdateManyWithWhereWithoutMeseroInput[]
    deleteMany?: ComandasScalarWhereInput | ComandasScalarWhereInput[]
  }

  export type ComandasCreateNestedManyWithoutMesaInput = {
    create?: XOR<ComandasCreateWithoutMesaInput, ComandasUncheckedCreateWithoutMesaInput> | ComandasCreateWithoutMesaInput[] | ComandasUncheckedCreateWithoutMesaInput[]
    connectOrCreate?: ComandasCreateOrConnectWithoutMesaInput | ComandasCreateOrConnectWithoutMesaInput[]
    createMany?: ComandasCreateManyMesaInputEnvelope
    connect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
  }

  export type ComandasUncheckedCreateNestedManyWithoutMesaInput = {
    create?: XOR<ComandasCreateWithoutMesaInput, ComandasUncheckedCreateWithoutMesaInput> | ComandasCreateWithoutMesaInput[] | ComandasUncheckedCreateWithoutMesaInput[]
    connectOrCreate?: ComandasCreateOrConnectWithoutMesaInput | ComandasCreateOrConnectWithoutMesaInput[]
    createMany?: ComandasCreateManyMesaInputEnvelope
    connect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ComandasUpdateManyWithoutMesaNestedInput = {
    create?: XOR<ComandasCreateWithoutMesaInput, ComandasUncheckedCreateWithoutMesaInput> | ComandasCreateWithoutMesaInput[] | ComandasUncheckedCreateWithoutMesaInput[]
    connectOrCreate?: ComandasCreateOrConnectWithoutMesaInput | ComandasCreateOrConnectWithoutMesaInput[]
    upsert?: ComandasUpsertWithWhereUniqueWithoutMesaInput | ComandasUpsertWithWhereUniqueWithoutMesaInput[]
    createMany?: ComandasCreateManyMesaInputEnvelope
    set?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    disconnect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    delete?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    connect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    update?: ComandasUpdateWithWhereUniqueWithoutMesaInput | ComandasUpdateWithWhereUniqueWithoutMesaInput[]
    updateMany?: ComandasUpdateManyWithWhereWithoutMesaInput | ComandasUpdateManyWithWhereWithoutMesaInput[]
    deleteMany?: ComandasScalarWhereInput | ComandasScalarWhereInput[]
  }

  export type ComandasUncheckedUpdateManyWithoutMesaNestedInput = {
    create?: XOR<ComandasCreateWithoutMesaInput, ComandasUncheckedCreateWithoutMesaInput> | ComandasCreateWithoutMesaInput[] | ComandasUncheckedCreateWithoutMesaInput[]
    connectOrCreate?: ComandasCreateOrConnectWithoutMesaInput | ComandasCreateOrConnectWithoutMesaInput[]
    upsert?: ComandasUpsertWithWhereUniqueWithoutMesaInput | ComandasUpsertWithWhereUniqueWithoutMesaInput[]
    createMany?: ComandasCreateManyMesaInputEnvelope
    set?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    disconnect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    delete?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    connect?: ComandasWhereUniqueInput | ComandasWhereUniqueInput[]
    update?: ComandasUpdateWithWhereUniqueWithoutMesaInput | ComandasUpdateWithWhereUniqueWithoutMesaInput[]
    updateMany?: ComandasUpdateManyWithWhereWithoutMesaInput | ComandasUpdateManyWithWhereWithoutMesaInput[]
    deleteMany?: ComandasScalarWhereInput | ComandasScalarWhereInput[]
  }

  export type DetalleComandaCreateNestedManyWithoutProductoInput = {
    create?: XOR<DetalleComandaCreateWithoutProductoInput, DetalleComandaUncheckedCreateWithoutProductoInput> | DetalleComandaCreateWithoutProductoInput[] | DetalleComandaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleComandaCreateOrConnectWithoutProductoInput | DetalleComandaCreateOrConnectWithoutProductoInput[]
    createMany?: DetalleComandaCreateManyProductoInputEnvelope
    connect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
  }

  export type HistorialAnaliticoCreateNestedManyWithoutProductoInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutProductoInput, HistorialAnaliticoUncheckedCreateWithoutProductoInput> | HistorialAnaliticoCreateWithoutProductoInput[] | HistorialAnaliticoUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutProductoInput | HistorialAnaliticoCreateOrConnectWithoutProductoInput[]
    createMany?: HistorialAnaliticoCreateManyProductoInputEnvelope
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
  }

  export type ProductoAditamentosCreateNestedManyWithoutProductoInput = {
    create?: XOR<ProductoAditamentosCreateWithoutProductoInput, ProductoAditamentosUncheckedCreateWithoutProductoInput> | ProductoAditamentosCreateWithoutProductoInput[] | ProductoAditamentosUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoAditamentosCreateOrConnectWithoutProductoInput | ProductoAditamentosCreateOrConnectWithoutProductoInput[]
    createMany?: ProductoAditamentosCreateManyProductoInputEnvelope
    connect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
  }

  export type ProductoImagenCreateNestedManyWithoutProductoInput = {
    create?: XOR<ProductoImagenCreateWithoutProductoInput, ProductoImagenUncheckedCreateWithoutProductoInput> | ProductoImagenCreateWithoutProductoInput[] | ProductoImagenUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoImagenCreateOrConnectWithoutProductoInput | ProductoImagenCreateOrConnectWithoutProductoInput[]
    createMany?: ProductoImagenCreateManyProductoInputEnvelope
    connect?: ProductoImagenWhereUniqueInput | ProductoImagenWhereUniqueInput[]
  }

  export type CategoriaCreateNestedOneWithoutProductosInput = {
    create?: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutProductosInput
    connect?: CategoriaWhereUniqueInput
  }

  export type SubCategoriaCreateNestedOneWithoutProductosInput = {
    create?: XOR<SubCategoriaCreateWithoutProductosInput, SubCategoriaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: SubCategoriaCreateOrConnectWithoutProductosInput
    connect?: SubCategoriaWhereUniqueInput
  }

  export type DetalleComandaUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<DetalleComandaCreateWithoutProductoInput, DetalleComandaUncheckedCreateWithoutProductoInput> | DetalleComandaCreateWithoutProductoInput[] | DetalleComandaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleComandaCreateOrConnectWithoutProductoInput | DetalleComandaCreateOrConnectWithoutProductoInput[]
    createMany?: DetalleComandaCreateManyProductoInputEnvelope
    connect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
  }

  export type HistorialAnaliticoUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutProductoInput, HistorialAnaliticoUncheckedCreateWithoutProductoInput> | HistorialAnaliticoCreateWithoutProductoInput[] | HistorialAnaliticoUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutProductoInput | HistorialAnaliticoCreateOrConnectWithoutProductoInput[]
    createMany?: HistorialAnaliticoCreateManyProductoInputEnvelope
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
  }

  export type ProductoAditamentosUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<ProductoAditamentosCreateWithoutProductoInput, ProductoAditamentosUncheckedCreateWithoutProductoInput> | ProductoAditamentosCreateWithoutProductoInput[] | ProductoAditamentosUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoAditamentosCreateOrConnectWithoutProductoInput | ProductoAditamentosCreateOrConnectWithoutProductoInput[]
    createMany?: ProductoAditamentosCreateManyProductoInputEnvelope
    connect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
  }

  export type ProductoImagenUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<ProductoImagenCreateWithoutProductoInput, ProductoImagenUncheckedCreateWithoutProductoInput> | ProductoImagenCreateWithoutProductoInput[] | ProductoImagenUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoImagenCreateOrConnectWithoutProductoInput | ProductoImagenCreateOrConnectWithoutProductoInput[]
    createMany?: ProductoImagenCreateManyProductoInputEnvelope
    connect?: ProductoImagenWhereUniqueInput | ProductoImagenWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DetalleComandaUpdateManyWithoutProductoNestedInput = {
    create?: XOR<DetalleComandaCreateWithoutProductoInput, DetalleComandaUncheckedCreateWithoutProductoInput> | DetalleComandaCreateWithoutProductoInput[] | DetalleComandaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleComandaCreateOrConnectWithoutProductoInput | DetalleComandaCreateOrConnectWithoutProductoInput[]
    upsert?: DetalleComandaUpsertWithWhereUniqueWithoutProductoInput | DetalleComandaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: DetalleComandaCreateManyProductoInputEnvelope
    set?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    disconnect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    delete?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    connect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    update?: DetalleComandaUpdateWithWhereUniqueWithoutProductoInput | DetalleComandaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: DetalleComandaUpdateManyWithWhereWithoutProductoInput | DetalleComandaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: DetalleComandaScalarWhereInput | DetalleComandaScalarWhereInput[]
  }

  export type HistorialAnaliticoUpdateManyWithoutProductoNestedInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutProductoInput, HistorialAnaliticoUncheckedCreateWithoutProductoInput> | HistorialAnaliticoCreateWithoutProductoInput[] | HistorialAnaliticoUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutProductoInput | HistorialAnaliticoCreateOrConnectWithoutProductoInput[]
    upsert?: HistorialAnaliticoUpsertWithWhereUniqueWithoutProductoInput | HistorialAnaliticoUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: HistorialAnaliticoCreateManyProductoInputEnvelope
    set?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    disconnect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    delete?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    update?: HistorialAnaliticoUpdateWithWhereUniqueWithoutProductoInput | HistorialAnaliticoUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: HistorialAnaliticoUpdateManyWithWhereWithoutProductoInput | HistorialAnaliticoUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: HistorialAnaliticoScalarWhereInput | HistorialAnaliticoScalarWhereInput[]
  }

  export type ProductoAditamentosUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ProductoAditamentosCreateWithoutProductoInput, ProductoAditamentosUncheckedCreateWithoutProductoInput> | ProductoAditamentosCreateWithoutProductoInput[] | ProductoAditamentosUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoAditamentosCreateOrConnectWithoutProductoInput | ProductoAditamentosCreateOrConnectWithoutProductoInput[]
    upsert?: ProductoAditamentosUpsertWithWhereUniqueWithoutProductoInput | ProductoAditamentosUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ProductoAditamentosCreateManyProductoInputEnvelope
    set?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    disconnect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    delete?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    connect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    update?: ProductoAditamentosUpdateWithWhereUniqueWithoutProductoInput | ProductoAditamentosUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ProductoAditamentosUpdateManyWithWhereWithoutProductoInput | ProductoAditamentosUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ProductoAditamentosScalarWhereInput | ProductoAditamentosScalarWhereInput[]
  }

  export type ProductoImagenUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ProductoImagenCreateWithoutProductoInput, ProductoImagenUncheckedCreateWithoutProductoInput> | ProductoImagenCreateWithoutProductoInput[] | ProductoImagenUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoImagenCreateOrConnectWithoutProductoInput | ProductoImagenCreateOrConnectWithoutProductoInput[]
    upsert?: ProductoImagenUpsertWithWhereUniqueWithoutProductoInput | ProductoImagenUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ProductoImagenCreateManyProductoInputEnvelope
    set?: ProductoImagenWhereUniqueInput | ProductoImagenWhereUniqueInput[]
    disconnect?: ProductoImagenWhereUniqueInput | ProductoImagenWhereUniqueInput[]
    delete?: ProductoImagenWhereUniqueInput | ProductoImagenWhereUniqueInput[]
    connect?: ProductoImagenWhereUniqueInput | ProductoImagenWhereUniqueInput[]
    update?: ProductoImagenUpdateWithWhereUniqueWithoutProductoInput | ProductoImagenUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ProductoImagenUpdateManyWithWhereWithoutProductoInput | ProductoImagenUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ProductoImagenScalarWhereInput | ProductoImagenScalarWhereInput[]
  }

  export type CategoriaUpdateOneRequiredWithoutProductosNestedInput = {
    create?: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutProductosInput
    upsert?: CategoriaUpsertWithoutProductosInput
    connect?: CategoriaWhereUniqueInput
    update?: XOR<XOR<CategoriaUpdateToOneWithWhereWithoutProductosInput, CategoriaUpdateWithoutProductosInput>, CategoriaUncheckedUpdateWithoutProductosInput>
  }

  export type SubCategoriaUpdateOneRequiredWithoutProductosNestedInput = {
    create?: XOR<SubCategoriaCreateWithoutProductosInput, SubCategoriaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: SubCategoriaCreateOrConnectWithoutProductosInput
    upsert?: SubCategoriaUpsertWithoutProductosInput
    connect?: SubCategoriaWhereUniqueInput
    update?: XOR<XOR<SubCategoriaUpdateToOneWithWhereWithoutProductosInput, SubCategoriaUpdateWithoutProductosInput>, SubCategoriaUncheckedUpdateWithoutProductosInput>
  }

  export type DetalleComandaUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<DetalleComandaCreateWithoutProductoInput, DetalleComandaUncheckedCreateWithoutProductoInput> | DetalleComandaCreateWithoutProductoInput[] | DetalleComandaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: DetalleComandaCreateOrConnectWithoutProductoInput | DetalleComandaCreateOrConnectWithoutProductoInput[]
    upsert?: DetalleComandaUpsertWithWhereUniqueWithoutProductoInput | DetalleComandaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: DetalleComandaCreateManyProductoInputEnvelope
    set?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    disconnect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    delete?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    connect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    update?: DetalleComandaUpdateWithWhereUniqueWithoutProductoInput | DetalleComandaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: DetalleComandaUpdateManyWithWhereWithoutProductoInput | DetalleComandaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: DetalleComandaScalarWhereInput | DetalleComandaScalarWhereInput[]
  }

  export type HistorialAnaliticoUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutProductoInput, HistorialAnaliticoUncheckedCreateWithoutProductoInput> | HistorialAnaliticoCreateWithoutProductoInput[] | HistorialAnaliticoUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutProductoInput | HistorialAnaliticoCreateOrConnectWithoutProductoInput[]
    upsert?: HistorialAnaliticoUpsertWithWhereUniqueWithoutProductoInput | HistorialAnaliticoUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: HistorialAnaliticoCreateManyProductoInputEnvelope
    set?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    disconnect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    delete?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    update?: HistorialAnaliticoUpdateWithWhereUniqueWithoutProductoInput | HistorialAnaliticoUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: HistorialAnaliticoUpdateManyWithWhereWithoutProductoInput | HistorialAnaliticoUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: HistorialAnaliticoScalarWhereInput | HistorialAnaliticoScalarWhereInput[]
  }

  export type ProductoAditamentosUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ProductoAditamentosCreateWithoutProductoInput, ProductoAditamentosUncheckedCreateWithoutProductoInput> | ProductoAditamentosCreateWithoutProductoInput[] | ProductoAditamentosUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoAditamentosCreateOrConnectWithoutProductoInput | ProductoAditamentosCreateOrConnectWithoutProductoInput[]
    upsert?: ProductoAditamentosUpsertWithWhereUniqueWithoutProductoInput | ProductoAditamentosUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ProductoAditamentosCreateManyProductoInputEnvelope
    set?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    disconnect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    delete?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    connect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    update?: ProductoAditamentosUpdateWithWhereUniqueWithoutProductoInput | ProductoAditamentosUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ProductoAditamentosUpdateManyWithWhereWithoutProductoInput | ProductoAditamentosUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ProductoAditamentosScalarWhereInput | ProductoAditamentosScalarWhereInput[]
  }

  export type ProductoImagenUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ProductoImagenCreateWithoutProductoInput, ProductoImagenUncheckedCreateWithoutProductoInput> | ProductoImagenCreateWithoutProductoInput[] | ProductoImagenUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ProductoImagenCreateOrConnectWithoutProductoInput | ProductoImagenCreateOrConnectWithoutProductoInput[]
    upsert?: ProductoImagenUpsertWithWhereUniqueWithoutProductoInput | ProductoImagenUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ProductoImagenCreateManyProductoInputEnvelope
    set?: ProductoImagenWhereUniqueInput | ProductoImagenWhereUniqueInput[]
    disconnect?: ProductoImagenWhereUniqueInput | ProductoImagenWhereUniqueInput[]
    delete?: ProductoImagenWhereUniqueInput | ProductoImagenWhereUniqueInput[]
    connect?: ProductoImagenWhereUniqueInput | ProductoImagenWhereUniqueInput[]
    update?: ProductoImagenUpdateWithWhereUniqueWithoutProductoInput | ProductoImagenUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ProductoImagenUpdateManyWithWhereWithoutProductoInput | ProductoImagenUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ProductoImagenScalarWhereInput | ProductoImagenScalarWhereInput[]
  }

  export type ComandaAditamentosCreateNestedManyWithoutAditamentoInput = {
    create?: XOR<ComandaAditamentosCreateWithoutAditamentoInput, ComandaAditamentosUncheckedCreateWithoutAditamentoInput> | ComandaAditamentosCreateWithoutAditamentoInput[] | ComandaAditamentosUncheckedCreateWithoutAditamentoInput[]
    connectOrCreate?: ComandaAditamentosCreateOrConnectWithoutAditamentoInput | ComandaAditamentosCreateOrConnectWithoutAditamentoInput[]
    createMany?: ComandaAditamentosCreateManyAditamentoInputEnvelope
    connect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
  }

  export type ProductoAditamentosCreateNestedManyWithoutAditamentoInput = {
    create?: XOR<ProductoAditamentosCreateWithoutAditamentoInput, ProductoAditamentosUncheckedCreateWithoutAditamentoInput> | ProductoAditamentosCreateWithoutAditamentoInput[] | ProductoAditamentosUncheckedCreateWithoutAditamentoInput[]
    connectOrCreate?: ProductoAditamentosCreateOrConnectWithoutAditamentoInput | ProductoAditamentosCreateOrConnectWithoutAditamentoInput[]
    createMany?: ProductoAditamentosCreateManyAditamentoInputEnvelope
    connect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
  }

  export type ComandaAditamentosUncheckedCreateNestedManyWithoutAditamentoInput = {
    create?: XOR<ComandaAditamentosCreateWithoutAditamentoInput, ComandaAditamentosUncheckedCreateWithoutAditamentoInput> | ComandaAditamentosCreateWithoutAditamentoInput[] | ComandaAditamentosUncheckedCreateWithoutAditamentoInput[]
    connectOrCreate?: ComandaAditamentosCreateOrConnectWithoutAditamentoInput | ComandaAditamentosCreateOrConnectWithoutAditamentoInput[]
    createMany?: ComandaAditamentosCreateManyAditamentoInputEnvelope
    connect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
  }

  export type ProductoAditamentosUncheckedCreateNestedManyWithoutAditamentoInput = {
    create?: XOR<ProductoAditamentosCreateWithoutAditamentoInput, ProductoAditamentosUncheckedCreateWithoutAditamentoInput> | ProductoAditamentosCreateWithoutAditamentoInput[] | ProductoAditamentosUncheckedCreateWithoutAditamentoInput[]
    connectOrCreate?: ProductoAditamentosCreateOrConnectWithoutAditamentoInput | ProductoAditamentosCreateOrConnectWithoutAditamentoInput[]
    createMany?: ProductoAditamentosCreateManyAditamentoInputEnvelope
    connect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ComandaAditamentosUpdateManyWithoutAditamentoNestedInput = {
    create?: XOR<ComandaAditamentosCreateWithoutAditamentoInput, ComandaAditamentosUncheckedCreateWithoutAditamentoInput> | ComandaAditamentosCreateWithoutAditamentoInput[] | ComandaAditamentosUncheckedCreateWithoutAditamentoInput[]
    connectOrCreate?: ComandaAditamentosCreateOrConnectWithoutAditamentoInput | ComandaAditamentosCreateOrConnectWithoutAditamentoInput[]
    upsert?: ComandaAditamentosUpsertWithWhereUniqueWithoutAditamentoInput | ComandaAditamentosUpsertWithWhereUniqueWithoutAditamentoInput[]
    createMany?: ComandaAditamentosCreateManyAditamentoInputEnvelope
    set?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    disconnect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    delete?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    connect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    update?: ComandaAditamentosUpdateWithWhereUniqueWithoutAditamentoInput | ComandaAditamentosUpdateWithWhereUniqueWithoutAditamentoInput[]
    updateMany?: ComandaAditamentosUpdateManyWithWhereWithoutAditamentoInput | ComandaAditamentosUpdateManyWithWhereWithoutAditamentoInput[]
    deleteMany?: ComandaAditamentosScalarWhereInput | ComandaAditamentosScalarWhereInput[]
  }

  export type ProductoAditamentosUpdateManyWithoutAditamentoNestedInput = {
    create?: XOR<ProductoAditamentosCreateWithoutAditamentoInput, ProductoAditamentosUncheckedCreateWithoutAditamentoInput> | ProductoAditamentosCreateWithoutAditamentoInput[] | ProductoAditamentosUncheckedCreateWithoutAditamentoInput[]
    connectOrCreate?: ProductoAditamentosCreateOrConnectWithoutAditamentoInput | ProductoAditamentosCreateOrConnectWithoutAditamentoInput[]
    upsert?: ProductoAditamentosUpsertWithWhereUniqueWithoutAditamentoInput | ProductoAditamentosUpsertWithWhereUniqueWithoutAditamentoInput[]
    createMany?: ProductoAditamentosCreateManyAditamentoInputEnvelope
    set?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    disconnect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    delete?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    connect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    update?: ProductoAditamentosUpdateWithWhereUniqueWithoutAditamentoInput | ProductoAditamentosUpdateWithWhereUniqueWithoutAditamentoInput[]
    updateMany?: ProductoAditamentosUpdateManyWithWhereWithoutAditamentoInput | ProductoAditamentosUpdateManyWithWhereWithoutAditamentoInput[]
    deleteMany?: ProductoAditamentosScalarWhereInput | ProductoAditamentosScalarWhereInput[]
  }

  export type ComandaAditamentosUncheckedUpdateManyWithoutAditamentoNestedInput = {
    create?: XOR<ComandaAditamentosCreateWithoutAditamentoInput, ComandaAditamentosUncheckedCreateWithoutAditamentoInput> | ComandaAditamentosCreateWithoutAditamentoInput[] | ComandaAditamentosUncheckedCreateWithoutAditamentoInput[]
    connectOrCreate?: ComandaAditamentosCreateOrConnectWithoutAditamentoInput | ComandaAditamentosCreateOrConnectWithoutAditamentoInput[]
    upsert?: ComandaAditamentosUpsertWithWhereUniqueWithoutAditamentoInput | ComandaAditamentosUpsertWithWhereUniqueWithoutAditamentoInput[]
    createMany?: ComandaAditamentosCreateManyAditamentoInputEnvelope
    set?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    disconnect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    delete?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    connect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    update?: ComandaAditamentosUpdateWithWhereUniqueWithoutAditamentoInput | ComandaAditamentosUpdateWithWhereUniqueWithoutAditamentoInput[]
    updateMany?: ComandaAditamentosUpdateManyWithWhereWithoutAditamentoInput | ComandaAditamentosUpdateManyWithWhereWithoutAditamentoInput[]
    deleteMany?: ComandaAditamentosScalarWhereInput | ComandaAditamentosScalarWhereInput[]
  }

  export type ProductoAditamentosUncheckedUpdateManyWithoutAditamentoNestedInput = {
    create?: XOR<ProductoAditamentosCreateWithoutAditamentoInput, ProductoAditamentosUncheckedCreateWithoutAditamentoInput> | ProductoAditamentosCreateWithoutAditamentoInput[] | ProductoAditamentosUncheckedCreateWithoutAditamentoInput[]
    connectOrCreate?: ProductoAditamentosCreateOrConnectWithoutAditamentoInput | ProductoAditamentosCreateOrConnectWithoutAditamentoInput[]
    upsert?: ProductoAditamentosUpsertWithWhereUniqueWithoutAditamentoInput | ProductoAditamentosUpsertWithWhereUniqueWithoutAditamentoInput[]
    createMany?: ProductoAditamentosCreateManyAditamentoInputEnvelope
    set?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    disconnect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    delete?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    connect?: ProductoAditamentosWhereUniqueInput | ProductoAditamentosWhereUniqueInput[]
    update?: ProductoAditamentosUpdateWithWhereUniqueWithoutAditamentoInput | ProductoAditamentosUpdateWithWhereUniqueWithoutAditamentoInput[]
    updateMany?: ProductoAditamentosUpdateManyWithWhereWithoutAditamentoInput | ProductoAditamentosUpdateManyWithWhereWithoutAditamentoInput[]
    deleteMany?: ProductoAditamentosScalarWhereInput | ProductoAditamentosScalarWhereInput[]
  }

  export type AditamentoCreateNestedOneWithoutProductosInput = {
    create?: XOR<AditamentoCreateWithoutProductosInput, AditamentoUncheckedCreateWithoutProductosInput>
    connectOrCreate?: AditamentoCreateOrConnectWithoutProductosInput
    connect?: AditamentoWhereUniqueInput
  }

  export type ProductoCreateNestedOneWithoutAditamentosInput = {
    create?: XOR<ProductoCreateWithoutAditamentosInput, ProductoUncheckedCreateWithoutAditamentosInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutAditamentosInput
    connect?: ProductoWhereUniqueInput
  }

  export type AditamentoUpdateOneRequiredWithoutProductosNestedInput = {
    create?: XOR<AditamentoCreateWithoutProductosInput, AditamentoUncheckedCreateWithoutProductosInput>
    connectOrCreate?: AditamentoCreateOrConnectWithoutProductosInput
    upsert?: AditamentoUpsertWithoutProductosInput
    connect?: AditamentoWhereUniqueInput
    update?: XOR<XOR<AditamentoUpdateToOneWithWhereWithoutProductosInput, AditamentoUpdateWithoutProductosInput>, AditamentoUncheckedUpdateWithoutProductosInput>
  }

  export type ProductoUpdateOneRequiredWithoutAditamentosNestedInput = {
    create?: XOR<ProductoCreateWithoutAditamentosInput, ProductoUncheckedCreateWithoutAditamentosInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutAditamentosInput
    upsert?: ProductoUpsertWithoutAditamentosInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutAditamentosInput, ProductoUpdateWithoutAditamentosInput>, ProductoUncheckedUpdateWithoutAditamentosInput>
  }

  export type MesaCreateNestedOneWithoutComandasInput = {
    create?: XOR<MesaCreateWithoutComandasInput, MesaUncheckedCreateWithoutComandasInput>
    connectOrCreate?: MesaCreateOrConnectWithoutComandasInput
    connect?: MesaWhereUniqueInput
  }

  export type MeseroCreateNestedOneWithoutComandasInput = {
    create?: XOR<MeseroCreateWithoutComandasInput, MeseroUncheckedCreateWithoutComandasInput>
    connectOrCreate?: MeseroCreateOrConnectWithoutComandasInput
    connect?: MeseroWhereUniqueInput
  }

  export type DetalleComandaCreateNestedManyWithoutComandaInput = {
    create?: XOR<DetalleComandaCreateWithoutComandaInput, DetalleComandaUncheckedCreateWithoutComandaInput> | DetalleComandaCreateWithoutComandaInput[] | DetalleComandaUncheckedCreateWithoutComandaInput[]
    connectOrCreate?: DetalleComandaCreateOrConnectWithoutComandaInput | DetalleComandaCreateOrConnectWithoutComandaInput[]
    createMany?: DetalleComandaCreateManyComandaInputEnvelope
    connect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
  }

  export type DetalleComandaUncheckedCreateNestedManyWithoutComandaInput = {
    create?: XOR<DetalleComandaCreateWithoutComandaInput, DetalleComandaUncheckedCreateWithoutComandaInput> | DetalleComandaCreateWithoutComandaInput[] | DetalleComandaUncheckedCreateWithoutComandaInput[]
    connectOrCreate?: DetalleComandaCreateOrConnectWithoutComandaInput | DetalleComandaCreateOrConnectWithoutComandaInput[]
    createMany?: DetalleComandaCreateManyComandaInputEnvelope
    connect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
  }

  export type MesaUpdateOneRequiredWithoutComandasNestedInput = {
    create?: XOR<MesaCreateWithoutComandasInput, MesaUncheckedCreateWithoutComandasInput>
    connectOrCreate?: MesaCreateOrConnectWithoutComandasInput
    upsert?: MesaUpsertWithoutComandasInput
    connect?: MesaWhereUniqueInput
    update?: XOR<XOR<MesaUpdateToOneWithWhereWithoutComandasInput, MesaUpdateWithoutComandasInput>, MesaUncheckedUpdateWithoutComandasInput>
  }

  export type MeseroUpdateOneRequiredWithoutComandasNestedInput = {
    create?: XOR<MeseroCreateWithoutComandasInput, MeseroUncheckedCreateWithoutComandasInput>
    connectOrCreate?: MeseroCreateOrConnectWithoutComandasInput
    upsert?: MeseroUpsertWithoutComandasInput
    connect?: MeseroWhereUniqueInput
    update?: XOR<XOR<MeseroUpdateToOneWithWhereWithoutComandasInput, MeseroUpdateWithoutComandasInput>, MeseroUncheckedUpdateWithoutComandasInput>
  }

  export type DetalleComandaUpdateManyWithoutComandaNestedInput = {
    create?: XOR<DetalleComandaCreateWithoutComandaInput, DetalleComandaUncheckedCreateWithoutComandaInput> | DetalleComandaCreateWithoutComandaInput[] | DetalleComandaUncheckedCreateWithoutComandaInput[]
    connectOrCreate?: DetalleComandaCreateOrConnectWithoutComandaInput | DetalleComandaCreateOrConnectWithoutComandaInput[]
    upsert?: DetalleComandaUpsertWithWhereUniqueWithoutComandaInput | DetalleComandaUpsertWithWhereUniqueWithoutComandaInput[]
    createMany?: DetalleComandaCreateManyComandaInputEnvelope
    set?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    disconnect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    delete?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    connect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    update?: DetalleComandaUpdateWithWhereUniqueWithoutComandaInput | DetalleComandaUpdateWithWhereUniqueWithoutComandaInput[]
    updateMany?: DetalleComandaUpdateManyWithWhereWithoutComandaInput | DetalleComandaUpdateManyWithWhereWithoutComandaInput[]
    deleteMany?: DetalleComandaScalarWhereInput | DetalleComandaScalarWhereInput[]
  }

  export type DetalleComandaUncheckedUpdateManyWithoutComandaNestedInput = {
    create?: XOR<DetalleComandaCreateWithoutComandaInput, DetalleComandaUncheckedCreateWithoutComandaInput> | DetalleComandaCreateWithoutComandaInput[] | DetalleComandaUncheckedCreateWithoutComandaInput[]
    connectOrCreate?: DetalleComandaCreateOrConnectWithoutComandaInput | DetalleComandaCreateOrConnectWithoutComandaInput[]
    upsert?: DetalleComandaUpsertWithWhereUniqueWithoutComandaInput | DetalleComandaUpsertWithWhereUniqueWithoutComandaInput[]
    createMany?: DetalleComandaCreateManyComandaInputEnvelope
    set?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    disconnect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    delete?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    connect?: DetalleComandaWhereUniqueInput | DetalleComandaWhereUniqueInput[]
    update?: DetalleComandaUpdateWithWhereUniqueWithoutComandaInput | DetalleComandaUpdateWithWhereUniqueWithoutComandaInput[]
    updateMany?: DetalleComandaUpdateManyWithWhereWithoutComandaInput | DetalleComandaUpdateManyWithWhereWithoutComandaInput[]
    deleteMany?: DetalleComandaScalarWhereInput | DetalleComandaScalarWhereInput[]
  }

  export type ComandaAditamentosCreateNestedManyWithoutDetalleInput = {
    create?: XOR<ComandaAditamentosCreateWithoutDetalleInput, ComandaAditamentosUncheckedCreateWithoutDetalleInput> | ComandaAditamentosCreateWithoutDetalleInput[] | ComandaAditamentosUncheckedCreateWithoutDetalleInput[]
    connectOrCreate?: ComandaAditamentosCreateOrConnectWithoutDetalleInput | ComandaAditamentosCreateOrConnectWithoutDetalleInput[]
    createMany?: ComandaAditamentosCreateManyDetalleInputEnvelope
    connect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
  }

  export type ComandasCreateNestedOneWithoutDetallesInput = {
    create?: XOR<ComandasCreateWithoutDetallesInput, ComandasUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: ComandasCreateOrConnectWithoutDetallesInput
    connect?: ComandasWhereUniqueInput
  }

  export type ProductoCreateNestedOneWithoutDetallesInput = {
    create?: XOR<ProductoCreateWithoutDetallesInput, ProductoUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutDetallesInput
    connect?: ProductoWhereUniqueInput
  }

  export type ComandaAditamentosUncheckedCreateNestedManyWithoutDetalleInput = {
    create?: XOR<ComandaAditamentosCreateWithoutDetalleInput, ComandaAditamentosUncheckedCreateWithoutDetalleInput> | ComandaAditamentosCreateWithoutDetalleInput[] | ComandaAditamentosUncheckedCreateWithoutDetalleInput[]
    connectOrCreate?: ComandaAditamentosCreateOrConnectWithoutDetalleInput | ComandaAditamentosCreateOrConnectWithoutDetalleInput[]
    createMany?: ComandaAditamentosCreateManyDetalleInputEnvelope
    connect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
  }

  export type ComandaAditamentosUpdateManyWithoutDetalleNestedInput = {
    create?: XOR<ComandaAditamentosCreateWithoutDetalleInput, ComandaAditamentosUncheckedCreateWithoutDetalleInput> | ComandaAditamentosCreateWithoutDetalleInput[] | ComandaAditamentosUncheckedCreateWithoutDetalleInput[]
    connectOrCreate?: ComandaAditamentosCreateOrConnectWithoutDetalleInput | ComandaAditamentosCreateOrConnectWithoutDetalleInput[]
    upsert?: ComandaAditamentosUpsertWithWhereUniqueWithoutDetalleInput | ComandaAditamentosUpsertWithWhereUniqueWithoutDetalleInput[]
    createMany?: ComandaAditamentosCreateManyDetalleInputEnvelope
    set?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    disconnect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    delete?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    connect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    update?: ComandaAditamentosUpdateWithWhereUniqueWithoutDetalleInput | ComandaAditamentosUpdateWithWhereUniqueWithoutDetalleInput[]
    updateMany?: ComandaAditamentosUpdateManyWithWhereWithoutDetalleInput | ComandaAditamentosUpdateManyWithWhereWithoutDetalleInput[]
    deleteMany?: ComandaAditamentosScalarWhereInput | ComandaAditamentosScalarWhereInput[]
  }

  export type ComandasUpdateOneRequiredWithoutDetallesNestedInput = {
    create?: XOR<ComandasCreateWithoutDetallesInput, ComandasUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: ComandasCreateOrConnectWithoutDetallesInput
    upsert?: ComandasUpsertWithoutDetallesInput
    connect?: ComandasWhereUniqueInput
    update?: XOR<XOR<ComandasUpdateToOneWithWhereWithoutDetallesInput, ComandasUpdateWithoutDetallesInput>, ComandasUncheckedUpdateWithoutDetallesInput>
  }

  export type ProductoUpdateOneRequiredWithoutDetallesNestedInput = {
    create?: XOR<ProductoCreateWithoutDetallesInput, ProductoUncheckedCreateWithoutDetallesInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutDetallesInput
    upsert?: ProductoUpsertWithoutDetallesInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutDetallesInput, ProductoUpdateWithoutDetallesInput>, ProductoUncheckedUpdateWithoutDetallesInput>
  }

  export type ComandaAditamentosUncheckedUpdateManyWithoutDetalleNestedInput = {
    create?: XOR<ComandaAditamentosCreateWithoutDetalleInput, ComandaAditamentosUncheckedCreateWithoutDetalleInput> | ComandaAditamentosCreateWithoutDetalleInput[] | ComandaAditamentosUncheckedCreateWithoutDetalleInput[]
    connectOrCreate?: ComandaAditamentosCreateOrConnectWithoutDetalleInput | ComandaAditamentosCreateOrConnectWithoutDetalleInput[]
    upsert?: ComandaAditamentosUpsertWithWhereUniqueWithoutDetalleInput | ComandaAditamentosUpsertWithWhereUniqueWithoutDetalleInput[]
    createMany?: ComandaAditamentosCreateManyDetalleInputEnvelope
    set?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    disconnect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    delete?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    connect?: ComandaAditamentosWhereUniqueInput | ComandaAditamentosWhereUniqueInput[]
    update?: ComandaAditamentosUpdateWithWhereUniqueWithoutDetalleInput | ComandaAditamentosUpdateWithWhereUniqueWithoutDetalleInput[]
    updateMany?: ComandaAditamentosUpdateManyWithWhereWithoutDetalleInput | ComandaAditamentosUpdateManyWithWhereWithoutDetalleInput[]
    deleteMany?: ComandaAditamentosScalarWhereInput | ComandaAditamentosScalarWhereInput[]
  }

  export type AditamentoCreateNestedOneWithoutComandasInput = {
    create?: XOR<AditamentoCreateWithoutComandasInput, AditamentoUncheckedCreateWithoutComandasInput>
    connectOrCreate?: AditamentoCreateOrConnectWithoutComandasInput
    connect?: AditamentoWhereUniqueInput
  }

  export type DetalleComandaCreateNestedOneWithoutAditamentosInput = {
    create?: XOR<DetalleComandaCreateWithoutAditamentosInput, DetalleComandaUncheckedCreateWithoutAditamentosInput>
    connectOrCreate?: DetalleComandaCreateOrConnectWithoutAditamentosInput
    connect?: DetalleComandaWhereUniqueInput
  }

  export type AditamentoUpdateOneRequiredWithoutComandasNestedInput = {
    create?: XOR<AditamentoCreateWithoutComandasInput, AditamentoUncheckedCreateWithoutComandasInput>
    connectOrCreate?: AditamentoCreateOrConnectWithoutComandasInput
    upsert?: AditamentoUpsertWithoutComandasInput
    connect?: AditamentoWhereUniqueInput
    update?: XOR<XOR<AditamentoUpdateToOneWithWhereWithoutComandasInput, AditamentoUpdateWithoutComandasInput>, AditamentoUncheckedUpdateWithoutComandasInput>
  }

  export type DetalleComandaUpdateOneRequiredWithoutAditamentosNestedInput = {
    create?: XOR<DetalleComandaCreateWithoutAditamentosInput, DetalleComandaUncheckedCreateWithoutAditamentosInput>
    connectOrCreate?: DetalleComandaCreateOrConnectWithoutAditamentosInput
    upsert?: DetalleComandaUpsertWithoutAditamentosInput
    connect?: DetalleComandaWhereUniqueInput
    update?: XOR<XOR<DetalleComandaUpdateToOneWithWhereWithoutAditamentosInput, DetalleComandaUpdateWithoutAditamentosInput>, DetalleComandaUncheckedUpdateWithoutAditamentosInput>
  }

  export type ProductoCreateNestedOneWithoutImagenInput = {
    create?: XOR<ProductoCreateWithoutImagenInput, ProductoUncheckedCreateWithoutImagenInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutImagenInput
    connect?: ProductoWhereUniqueInput
  }

  export type ProductoUpdateOneRequiredWithoutImagenNestedInput = {
    create?: XOR<ProductoCreateWithoutImagenInput, ProductoUncheckedCreateWithoutImagenInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutImagenInput
    upsert?: ProductoUpsertWithoutImagenInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutImagenInput, ProductoUpdateWithoutImagenInput>, ProductoUncheckedUpdateWithoutImagenInput>
  }

  export type CategoriaCreateNestedOneWithoutHistorialInput = {
    create?: XOR<CategoriaCreateWithoutHistorialInput, CategoriaUncheckedCreateWithoutHistorialInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutHistorialInput
    connect?: CategoriaWhereUniqueInput
  }

  export type ProductoCreateNestedOneWithoutHistorialInput = {
    create?: XOR<ProductoCreateWithoutHistorialInput, ProductoUncheckedCreateWithoutHistorialInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutHistorialInput
    connect?: ProductoWhereUniqueInput
  }

  export type SubCategoriaCreateNestedOneWithoutHistorial_analiticoInput = {
    create?: XOR<SubCategoriaCreateWithoutHistorial_analiticoInput, SubCategoriaUncheckedCreateWithoutHistorial_analiticoInput>
    connectOrCreate?: SubCategoriaCreateOrConnectWithoutHistorial_analiticoInput
    connect?: SubCategoriaWhereUniqueInput
  }

  export type CategoriaUpdateOneRequiredWithoutHistorialNestedInput = {
    create?: XOR<CategoriaCreateWithoutHistorialInput, CategoriaUncheckedCreateWithoutHistorialInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutHistorialInput
    upsert?: CategoriaUpsertWithoutHistorialInput
    connect?: CategoriaWhereUniqueInput
    update?: XOR<XOR<CategoriaUpdateToOneWithWhereWithoutHistorialInput, CategoriaUpdateWithoutHistorialInput>, CategoriaUncheckedUpdateWithoutHistorialInput>
  }

  export type ProductoUpdateOneRequiredWithoutHistorialNestedInput = {
    create?: XOR<ProductoCreateWithoutHistorialInput, ProductoUncheckedCreateWithoutHistorialInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutHistorialInput
    upsert?: ProductoUpsertWithoutHistorialInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutHistorialInput, ProductoUpdateWithoutHistorialInput>, ProductoUncheckedUpdateWithoutHistorialInput>
  }

  export type SubCategoriaUpdateOneRequiredWithoutHistorial_analiticoNestedInput = {
    create?: XOR<SubCategoriaCreateWithoutHistorial_analiticoInput, SubCategoriaUncheckedCreateWithoutHistorial_analiticoInput>
    connectOrCreate?: SubCategoriaCreateOrConnectWithoutHistorial_analiticoInput
    upsert?: SubCategoriaUpsertWithoutHistorial_analiticoInput
    connect?: SubCategoriaWhereUniqueInput
    update?: XOR<XOR<SubCategoriaUpdateToOneWithWhereWithoutHistorial_analiticoInput, SubCategoriaUpdateWithoutHistorial_analiticoInput>, SubCategoriaUncheckedUpdateWithoutHistorial_analiticoInput>
  }

  export type HistorialAnaliticoCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutCategoriaInput, HistorialAnaliticoUncheckedCreateWithoutCategoriaInput> | HistorialAnaliticoCreateWithoutCategoriaInput[] | HistorialAnaliticoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutCategoriaInput | HistorialAnaliticoCreateOrConnectWithoutCategoriaInput[]
    createMany?: HistorialAnaliticoCreateManyCategoriaInputEnvelope
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
  }

  export type ProductoCreateNestedManyWithoutCategoriaRelInput = {
    create?: XOR<ProductoCreateWithoutCategoriaRelInput, ProductoUncheckedCreateWithoutCategoriaRelInput> | ProductoCreateWithoutCategoriaRelInput[] | ProductoUncheckedCreateWithoutCategoriaRelInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaRelInput | ProductoCreateOrConnectWithoutCategoriaRelInput[]
    createMany?: ProductoCreateManyCategoriaRelInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type SubCategoriaCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<SubCategoriaCreateWithoutCategoriaInput, SubCategoriaUncheckedCreateWithoutCategoriaInput> | SubCategoriaCreateWithoutCategoriaInput[] | SubCategoriaUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: SubCategoriaCreateOrConnectWithoutCategoriaInput | SubCategoriaCreateOrConnectWithoutCategoriaInput[]
    createMany?: SubCategoriaCreateManyCategoriaInputEnvelope
    connect?: SubCategoriaWhereUniqueInput | SubCategoriaWhereUniqueInput[]
  }

  export type HistorialAnaliticoUncheckedCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutCategoriaInput, HistorialAnaliticoUncheckedCreateWithoutCategoriaInput> | HistorialAnaliticoCreateWithoutCategoriaInput[] | HistorialAnaliticoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutCategoriaInput | HistorialAnaliticoCreateOrConnectWithoutCategoriaInput[]
    createMany?: HistorialAnaliticoCreateManyCategoriaInputEnvelope
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
  }

  export type ProductoUncheckedCreateNestedManyWithoutCategoriaRelInput = {
    create?: XOR<ProductoCreateWithoutCategoriaRelInput, ProductoUncheckedCreateWithoutCategoriaRelInput> | ProductoCreateWithoutCategoriaRelInput[] | ProductoUncheckedCreateWithoutCategoriaRelInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaRelInput | ProductoCreateOrConnectWithoutCategoriaRelInput[]
    createMany?: ProductoCreateManyCategoriaRelInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type SubCategoriaUncheckedCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<SubCategoriaCreateWithoutCategoriaInput, SubCategoriaUncheckedCreateWithoutCategoriaInput> | SubCategoriaCreateWithoutCategoriaInput[] | SubCategoriaUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: SubCategoriaCreateOrConnectWithoutCategoriaInput | SubCategoriaCreateOrConnectWithoutCategoriaInput[]
    createMany?: SubCategoriaCreateManyCategoriaInputEnvelope
    connect?: SubCategoriaWhereUniqueInput | SubCategoriaWhereUniqueInput[]
  }

  export type HistorialAnaliticoUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutCategoriaInput, HistorialAnaliticoUncheckedCreateWithoutCategoriaInput> | HistorialAnaliticoCreateWithoutCategoriaInput[] | HistorialAnaliticoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutCategoriaInput | HistorialAnaliticoCreateOrConnectWithoutCategoriaInput[]
    upsert?: HistorialAnaliticoUpsertWithWhereUniqueWithoutCategoriaInput | HistorialAnaliticoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: HistorialAnaliticoCreateManyCategoriaInputEnvelope
    set?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    disconnect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    delete?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    update?: HistorialAnaliticoUpdateWithWhereUniqueWithoutCategoriaInput | HistorialAnaliticoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: HistorialAnaliticoUpdateManyWithWhereWithoutCategoriaInput | HistorialAnaliticoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: HistorialAnaliticoScalarWhereInput | HistorialAnaliticoScalarWhereInput[]
  }

  export type ProductoUpdateManyWithoutCategoriaRelNestedInput = {
    create?: XOR<ProductoCreateWithoutCategoriaRelInput, ProductoUncheckedCreateWithoutCategoriaRelInput> | ProductoCreateWithoutCategoriaRelInput[] | ProductoUncheckedCreateWithoutCategoriaRelInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaRelInput | ProductoCreateOrConnectWithoutCategoriaRelInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutCategoriaRelInput | ProductoUpsertWithWhereUniqueWithoutCategoriaRelInput[]
    createMany?: ProductoCreateManyCategoriaRelInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutCategoriaRelInput | ProductoUpdateWithWhereUniqueWithoutCategoriaRelInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutCategoriaRelInput | ProductoUpdateManyWithWhereWithoutCategoriaRelInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type SubCategoriaUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<SubCategoriaCreateWithoutCategoriaInput, SubCategoriaUncheckedCreateWithoutCategoriaInput> | SubCategoriaCreateWithoutCategoriaInput[] | SubCategoriaUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: SubCategoriaCreateOrConnectWithoutCategoriaInput | SubCategoriaCreateOrConnectWithoutCategoriaInput[]
    upsert?: SubCategoriaUpsertWithWhereUniqueWithoutCategoriaInput | SubCategoriaUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: SubCategoriaCreateManyCategoriaInputEnvelope
    set?: SubCategoriaWhereUniqueInput | SubCategoriaWhereUniqueInput[]
    disconnect?: SubCategoriaWhereUniqueInput | SubCategoriaWhereUniqueInput[]
    delete?: SubCategoriaWhereUniqueInput | SubCategoriaWhereUniqueInput[]
    connect?: SubCategoriaWhereUniqueInput | SubCategoriaWhereUniqueInput[]
    update?: SubCategoriaUpdateWithWhereUniqueWithoutCategoriaInput | SubCategoriaUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: SubCategoriaUpdateManyWithWhereWithoutCategoriaInput | SubCategoriaUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: SubCategoriaScalarWhereInput | SubCategoriaScalarWhereInput[]
  }

  export type HistorialAnaliticoUncheckedUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutCategoriaInput, HistorialAnaliticoUncheckedCreateWithoutCategoriaInput> | HistorialAnaliticoCreateWithoutCategoriaInput[] | HistorialAnaliticoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutCategoriaInput | HistorialAnaliticoCreateOrConnectWithoutCategoriaInput[]
    upsert?: HistorialAnaliticoUpsertWithWhereUniqueWithoutCategoriaInput | HistorialAnaliticoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: HistorialAnaliticoCreateManyCategoriaInputEnvelope
    set?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    disconnect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    delete?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    update?: HistorialAnaliticoUpdateWithWhereUniqueWithoutCategoriaInput | HistorialAnaliticoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: HistorialAnaliticoUpdateManyWithWhereWithoutCategoriaInput | HistorialAnaliticoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: HistorialAnaliticoScalarWhereInput | HistorialAnaliticoScalarWhereInput[]
  }

  export type ProductoUncheckedUpdateManyWithoutCategoriaRelNestedInput = {
    create?: XOR<ProductoCreateWithoutCategoriaRelInput, ProductoUncheckedCreateWithoutCategoriaRelInput> | ProductoCreateWithoutCategoriaRelInput[] | ProductoUncheckedCreateWithoutCategoriaRelInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaRelInput | ProductoCreateOrConnectWithoutCategoriaRelInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutCategoriaRelInput | ProductoUpsertWithWhereUniqueWithoutCategoriaRelInput[]
    createMany?: ProductoCreateManyCategoriaRelInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutCategoriaRelInput | ProductoUpdateWithWhereUniqueWithoutCategoriaRelInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutCategoriaRelInput | ProductoUpdateManyWithWhereWithoutCategoriaRelInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type SubCategoriaUncheckedUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<SubCategoriaCreateWithoutCategoriaInput, SubCategoriaUncheckedCreateWithoutCategoriaInput> | SubCategoriaCreateWithoutCategoriaInput[] | SubCategoriaUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: SubCategoriaCreateOrConnectWithoutCategoriaInput | SubCategoriaCreateOrConnectWithoutCategoriaInput[]
    upsert?: SubCategoriaUpsertWithWhereUniqueWithoutCategoriaInput | SubCategoriaUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: SubCategoriaCreateManyCategoriaInputEnvelope
    set?: SubCategoriaWhereUniqueInput | SubCategoriaWhereUniqueInput[]
    disconnect?: SubCategoriaWhereUniqueInput | SubCategoriaWhereUniqueInput[]
    delete?: SubCategoriaWhereUniqueInput | SubCategoriaWhereUniqueInput[]
    connect?: SubCategoriaWhereUniqueInput | SubCategoriaWhereUniqueInput[]
    update?: SubCategoriaUpdateWithWhereUniqueWithoutCategoriaInput | SubCategoriaUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: SubCategoriaUpdateManyWithWhereWithoutCategoriaInput | SubCategoriaUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: SubCategoriaScalarWhereInput | SubCategoriaScalarWhereInput[]
  }

  export type HistorialAnaliticoCreateNestedManyWithoutSubcategoriasInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutSubcategoriasInput, HistorialAnaliticoUncheckedCreateWithoutSubcategoriasInput> | HistorialAnaliticoCreateWithoutSubcategoriasInput[] | HistorialAnaliticoUncheckedCreateWithoutSubcategoriasInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutSubcategoriasInput | HistorialAnaliticoCreateOrConnectWithoutSubcategoriasInput[]
    createMany?: HistorialAnaliticoCreateManySubcategoriasInputEnvelope
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
  }

  export type ProductoCreateNestedManyWithoutSubcategoriaInput = {
    create?: XOR<ProductoCreateWithoutSubcategoriaInput, ProductoUncheckedCreateWithoutSubcategoriaInput> | ProductoCreateWithoutSubcategoriaInput[] | ProductoUncheckedCreateWithoutSubcategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutSubcategoriaInput | ProductoCreateOrConnectWithoutSubcategoriaInput[]
    createMany?: ProductoCreateManySubcategoriaInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type CategoriaCreateNestedOneWithoutSubcategoriasInput = {
    create?: XOR<CategoriaCreateWithoutSubcategoriasInput, CategoriaUncheckedCreateWithoutSubcategoriasInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutSubcategoriasInput
    connect?: CategoriaWhereUniqueInput
  }

  export type HistorialAnaliticoUncheckedCreateNestedManyWithoutSubcategoriasInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutSubcategoriasInput, HistorialAnaliticoUncheckedCreateWithoutSubcategoriasInput> | HistorialAnaliticoCreateWithoutSubcategoriasInput[] | HistorialAnaliticoUncheckedCreateWithoutSubcategoriasInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutSubcategoriasInput | HistorialAnaliticoCreateOrConnectWithoutSubcategoriasInput[]
    createMany?: HistorialAnaliticoCreateManySubcategoriasInputEnvelope
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
  }

  export type ProductoUncheckedCreateNestedManyWithoutSubcategoriaInput = {
    create?: XOR<ProductoCreateWithoutSubcategoriaInput, ProductoUncheckedCreateWithoutSubcategoriaInput> | ProductoCreateWithoutSubcategoriaInput[] | ProductoUncheckedCreateWithoutSubcategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutSubcategoriaInput | ProductoCreateOrConnectWithoutSubcategoriaInput[]
    createMany?: ProductoCreateManySubcategoriaInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type HistorialAnaliticoUpdateManyWithoutSubcategoriasNestedInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutSubcategoriasInput, HistorialAnaliticoUncheckedCreateWithoutSubcategoriasInput> | HistorialAnaliticoCreateWithoutSubcategoriasInput[] | HistorialAnaliticoUncheckedCreateWithoutSubcategoriasInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutSubcategoriasInput | HistorialAnaliticoCreateOrConnectWithoutSubcategoriasInput[]
    upsert?: HistorialAnaliticoUpsertWithWhereUniqueWithoutSubcategoriasInput | HistorialAnaliticoUpsertWithWhereUniqueWithoutSubcategoriasInput[]
    createMany?: HistorialAnaliticoCreateManySubcategoriasInputEnvelope
    set?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    disconnect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    delete?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    update?: HistorialAnaliticoUpdateWithWhereUniqueWithoutSubcategoriasInput | HistorialAnaliticoUpdateWithWhereUniqueWithoutSubcategoriasInput[]
    updateMany?: HistorialAnaliticoUpdateManyWithWhereWithoutSubcategoriasInput | HistorialAnaliticoUpdateManyWithWhereWithoutSubcategoriasInput[]
    deleteMany?: HistorialAnaliticoScalarWhereInput | HistorialAnaliticoScalarWhereInput[]
  }

  export type ProductoUpdateManyWithoutSubcategoriaNestedInput = {
    create?: XOR<ProductoCreateWithoutSubcategoriaInput, ProductoUncheckedCreateWithoutSubcategoriaInput> | ProductoCreateWithoutSubcategoriaInput[] | ProductoUncheckedCreateWithoutSubcategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutSubcategoriaInput | ProductoCreateOrConnectWithoutSubcategoriaInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutSubcategoriaInput | ProductoUpsertWithWhereUniqueWithoutSubcategoriaInput[]
    createMany?: ProductoCreateManySubcategoriaInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutSubcategoriaInput | ProductoUpdateWithWhereUniqueWithoutSubcategoriaInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutSubcategoriaInput | ProductoUpdateManyWithWhereWithoutSubcategoriaInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type CategoriaUpdateOneRequiredWithoutSubcategoriasNestedInput = {
    create?: XOR<CategoriaCreateWithoutSubcategoriasInput, CategoriaUncheckedCreateWithoutSubcategoriasInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutSubcategoriasInput
    upsert?: CategoriaUpsertWithoutSubcategoriasInput
    connect?: CategoriaWhereUniqueInput
    update?: XOR<XOR<CategoriaUpdateToOneWithWhereWithoutSubcategoriasInput, CategoriaUpdateWithoutSubcategoriasInput>, CategoriaUncheckedUpdateWithoutSubcategoriasInput>
  }

  export type HistorialAnaliticoUncheckedUpdateManyWithoutSubcategoriasNestedInput = {
    create?: XOR<HistorialAnaliticoCreateWithoutSubcategoriasInput, HistorialAnaliticoUncheckedCreateWithoutSubcategoriasInput> | HistorialAnaliticoCreateWithoutSubcategoriasInput[] | HistorialAnaliticoUncheckedCreateWithoutSubcategoriasInput[]
    connectOrCreate?: HistorialAnaliticoCreateOrConnectWithoutSubcategoriasInput | HistorialAnaliticoCreateOrConnectWithoutSubcategoriasInput[]
    upsert?: HistorialAnaliticoUpsertWithWhereUniqueWithoutSubcategoriasInput | HistorialAnaliticoUpsertWithWhereUniqueWithoutSubcategoriasInput[]
    createMany?: HistorialAnaliticoCreateManySubcategoriasInputEnvelope
    set?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    disconnect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    delete?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    connect?: HistorialAnaliticoWhereUniqueInput | HistorialAnaliticoWhereUniqueInput[]
    update?: HistorialAnaliticoUpdateWithWhereUniqueWithoutSubcategoriasInput | HistorialAnaliticoUpdateWithWhereUniqueWithoutSubcategoriasInput[]
    updateMany?: HistorialAnaliticoUpdateManyWithWhereWithoutSubcategoriasInput | HistorialAnaliticoUpdateManyWithWhereWithoutSubcategoriasInput[]
    deleteMany?: HistorialAnaliticoScalarWhereInput | HistorialAnaliticoScalarWhereInput[]
  }

  export type ProductoUncheckedUpdateManyWithoutSubcategoriaNestedInput = {
    create?: XOR<ProductoCreateWithoutSubcategoriaInput, ProductoUncheckedCreateWithoutSubcategoriaInput> | ProductoCreateWithoutSubcategoriaInput[] | ProductoUncheckedCreateWithoutSubcategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutSubcategoriaInput | ProductoCreateOrConnectWithoutSubcategoriaInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutSubcategoriaInput | ProductoUpsertWithWhereUniqueWithoutSubcategoriaInput[]
    createMany?: ProductoCreateManySubcategoriaInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutSubcategoriaInput | ProductoUpdateWithWhereUniqueWithoutSubcategoriaInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutSubcategoriaInput | ProductoUpdateManyWithWhereWithoutSubcategoriaInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ComandasCreateWithoutMeseroInput = {
    fecha_hora?: Date | string | null
    estado?: string
    token?: string | null
    fecha_pagado?: Date | string | null
    impuestos?: number
    pagado?: boolean
    sub_total?: number
    total?: number
    transaccion_id?: string | null
    metodo_pago?: string | null
    mesa: MesaCreateNestedOneWithoutComandasInput
    detalles?: DetalleComandaCreateNestedManyWithoutComandaInput
  }

  export type ComandasUncheckedCreateWithoutMeseroInput = {
    id_comanda?: number
    id_mesa: number
    fecha_hora?: Date | string | null
    estado?: string
    token?: string | null
    fecha_pagado?: Date | string | null
    impuestos?: number
    pagado?: boolean
    sub_total?: number
    total?: number
    transaccion_id?: string | null
    metodo_pago?: string | null
    detalles?: DetalleComandaUncheckedCreateNestedManyWithoutComandaInput
  }

  export type ComandasCreateOrConnectWithoutMeseroInput = {
    where: ComandasWhereUniqueInput
    create: XOR<ComandasCreateWithoutMeseroInput, ComandasUncheckedCreateWithoutMeseroInput>
  }

  export type ComandasCreateManyMeseroInputEnvelope = {
    data: ComandasCreateManyMeseroInput | ComandasCreateManyMeseroInput[]
    skipDuplicates?: boolean
  }

  export type ComandasUpsertWithWhereUniqueWithoutMeseroInput = {
    where: ComandasWhereUniqueInput
    update: XOR<ComandasUpdateWithoutMeseroInput, ComandasUncheckedUpdateWithoutMeseroInput>
    create: XOR<ComandasCreateWithoutMeseroInput, ComandasUncheckedCreateWithoutMeseroInput>
  }

  export type ComandasUpdateWithWhereUniqueWithoutMeseroInput = {
    where: ComandasWhereUniqueInput
    data: XOR<ComandasUpdateWithoutMeseroInput, ComandasUncheckedUpdateWithoutMeseroInput>
  }

  export type ComandasUpdateManyWithWhereWithoutMeseroInput = {
    where: ComandasScalarWhereInput
    data: XOR<ComandasUpdateManyMutationInput, ComandasUncheckedUpdateManyWithoutMeseroInput>
  }

  export type ComandasScalarWhereInput = {
    AND?: ComandasScalarWhereInput | ComandasScalarWhereInput[]
    OR?: ComandasScalarWhereInput[]
    NOT?: ComandasScalarWhereInput | ComandasScalarWhereInput[]
    id_comanda?: IntFilter<"Comandas"> | number
    id_mesa?: IntFilter<"Comandas"> | number
    id_mesero?: IntFilter<"Comandas"> | number
    fecha_hora?: DateTimeNullableFilter<"Comandas"> | Date | string | null
    estado?: StringFilter<"Comandas"> | string
    token?: StringNullableFilter<"Comandas"> | string | null
    fecha_pagado?: DateTimeNullableFilter<"Comandas"> | Date | string | null
    impuestos?: FloatFilter<"Comandas"> | number
    pagado?: BoolFilter<"Comandas"> | boolean
    sub_total?: FloatFilter<"Comandas"> | number
    total?: FloatFilter<"Comandas"> | number
    transaccion_id?: StringNullableFilter<"Comandas"> | string | null
    metodo_pago?: StringNullableFilter<"Comandas"> | string | null
  }

  export type ComandasCreateWithoutMesaInput = {
    fecha_hora?: Date | string | null
    estado?: string
    token?: string | null
    fecha_pagado?: Date | string | null
    impuestos?: number
    pagado?: boolean
    sub_total?: number
    total?: number
    transaccion_id?: string | null
    metodo_pago?: string | null
    mesero: MeseroCreateNestedOneWithoutComandasInput
    detalles?: DetalleComandaCreateNestedManyWithoutComandaInput
  }

  export type ComandasUncheckedCreateWithoutMesaInput = {
    id_comanda?: number
    id_mesero: number
    fecha_hora?: Date | string | null
    estado?: string
    token?: string | null
    fecha_pagado?: Date | string | null
    impuestos?: number
    pagado?: boolean
    sub_total?: number
    total?: number
    transaccion_id?: string | null
    metodo_pago?: string | null
    detalles?: DetalleComandaUncheckedCreateNestedManyWithoutComandaInput
  }

  export type ComandasCreateOrConnectWithoutMesaInput = {
    where: ComandasWhereUniqueInput
    create: XOR<ComandasCreateWithoutMesaInput, ComandasUncheckedCreateWithoutMesaInput>
  }

  export type ComandasCreateManyMesaInputEnvelope = {
    data: ComandasCreateManyMesaInput | ComandasCreateManyMesaInput[]
    skipDuplicates?: boolean
  }

  export type ComandasUpsertWithWhereUniqueWithoutMesaInput = {
    where: ComandasWhereUniqueInput
    update: XOR<ComandasUpdateWithoutMesaInput, ComandasUncheckedUpdateWithoutMesaInput>
    create: XOR<ComandasCreateWithoutMesaInput, ComandasUncheckedCreateWithoutMesaInput>
  }

  export type ComandasUpdateWithWhereUniqueWithoutMesaInput = {
    where: ComandasWhereUniqueInput
    data: XOR<ComandasUpdateWithoutMesaInput, ComandasUncheckedUpdateWithoutMesaInput>
  }

  export type ComandasUpdateManyWithWhereWithoutMesaInput = {
    where: ComandasScalarWhereInput
    data: XOR<ComandasUpdateManyMutationInput, ComandasUncheckedUpdateManyWithoutMesaInput>
  }

  export type DetalleComandaCreateWithoutProductoInput = {
    cantidad?: number
    notas_especiales?: string | null
    status?: string
    hora?: number | null
    aditamentos?: ComandaAditamentosCreateNestedManyWithoutDetalleInput
    comanda: ComandasCreateNestedOneWithoutDetallesInput
  }

  export type DetalleComandaUncheckedCreateWithoutProductoInput = {
    id_detalle?: number
    id_comanda: number
    cantidad?: number
    notas_especiales?: string | null
    status?: string
    hora?: number | null
    aditamentos?: ComandaAditamentosUncheckedCreateNestedManyWithoutDetalleInput
  }

  export type DetalleComandaCreateOrConnectWithoutProductoInput = {
    where: DetalleComandaWhereUniqueInput
    create: XOR<DetalleComandaCreateWithoutProductoInput, DetalleComandaUncheckedCreateWithoutProductoInput>
  }

  export type DetalleComandaCreateManyProductoInputEnvelope = {
    data: DetalleComandaCreateManyProductoInput | DetalleComandaCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type HistorialAnaliticoCreateWithoutProductoInput = {
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
    categoria: CategoriaCreateNestedOneWithoutHistorialInput
    subcategorias: SubCategoriaCreateNestedOneWithoutHistorial_analiticoInput
  }

  export type HistorialAnaliticoUncheckedCreateWithoutProductoInput = {
    id_historial?: number
    id_subcategoria: number
    id_categoria: number
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
  }

  export type HistorialAnaliticoCreateOrConnectWithoutProductoInput = {
    where: HistorialAnaliticoWhereUniqueInput
    create: XOR<HistorialAnaliticoCreateWithoutProductoInput, HistorialAnaliticoUncheckedCreateWithoutProductoInput>
  }

  export type HistorialAnaliticoCreateManyProductoInputEnvelope = {
    data: HistorialAnaliticoCreateManyProductoInput | HistorialAnaliticoCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type ProductoAditamentosCreateWithoutProductoInput = {
    aditamento: AditamentoCreateNestedOneWithoutProductosInput
  }

  export type ProductoAditamentosUncheckedCreateWithoutProductoInput = {
    id_aditamento: number
  }

  export type ProductoAditamentosCreateOrConnectWithoutProductoInput = {
    where: ProductoAditamentosWhereUniqueInput
    create: XOR<ProductoAditamentosCreateWithoutProductoInput, ProductoAditamentosUncheckedCreateWithoutProductoInput>
  }

  export type ProductoAditamentosCreateManyProductoInputEnvelope = {
    data: ProductoAditamentosCreateManyProductoInput | ProductoAditamentosCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type ProductoImagenCreateWithoutProductoInput = {
    url: string
  }

  export type ProductoImagenUncheckedCreateWithoutProductoInput = {
    id_imagen?: number
    url: string
  }

  export type ProductoImagenCreateOrConnectWithoutProductoInput = {
    where: ProductoImagenWhereUniqueInput
    create: XOR<ProductoImagenCreateWithoutProductoInput, ProductoImagenUncheckedCreateWithoutProductoInput>
  }

  export type ProductoImagenCreateManyProductoInputEnvelope = {
    data: ProductoImagenCreateManyProductoInput | ProductoImagenCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type CategoriaCreateWithoutProductosInput = {
    nombre: string
    historial?: HistorialAnaliticoCreateNestedManyWithoutCategoriaInput
    subcategorias?: SubCategoriaCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateWithoutProductosInput = {
    id_categoria?: number
    nombre: string
    historial?: HistorialAnaliticoUncheckedCreateNestedManyWithoutCategoriaInput
    subcategorias?: SubCategoriaUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaCreateOrConnectWithoutProductosInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
  }

  export type SubCategoriaCreateWithoutProductosInput = {
    nombre: string
    historial_analitico?: HistorialAnaliticoCreateNestedManyWithoutSubcategoriasInput
    categoria: CategoriaCreateNestedOneWithoutSubcategoriasInput
  }

  export type SubCategoriaUncheckedCreateWithoutProductosInput = {
    id_subcategoria?: number
    nombre: string
    id_categoria: number
    historial_analitico?: HistorialAnaliticoUncheckedCreateNestedManyWithoutSubcategoriasInput
  }

  export type SubCategoriaCreateOrConnectWithoutProductosInput = {
    where: SubCategoriaWhereUniqueInput
    create: XOR<SubCategoriaCreateWithoutProductosInput, SubCategoriaUncheckedCreateWithoutProductosInput>
  }

  export type DetalleComandaUpsertWithWhereUniqueWithoutProductoInput = {
    where: DetalleComandaWhereUniqueInput
    update: XOR<DetalleComandaUpdateWithoutProductoInput, DetalleComandaUncheckedUpdateWithoutProductoInput>
    create: XOR<DetalleComandaCreateWithoutProductoInput, DetalleComandaUncheckedCreateWithoutProductoInput>
  }

  export type DetalleComandaUpdateWithWhereUniqueWithoutProductoInput = {
    where: DetalleComandaWhereUniqueInput
    data: XOR<DetalleComandaUpdateWithoutProductoInput, DetalleComandaUncheckedUpdateWithoutProductoInput>
  }

  export type DetalleComandaUpdateManyWithWhereWithoutProductoInput = {
    where: DetalleComandaScalarWhereInput
    data: XOR<DetalleComandaUpdateManyMutationInput, DetalleComandaUncheckedUpdateManyWithoutProductoInput>
  }

  export type DetalleComandaScalarWhereInput = {
    AND?: DetalleComandaScalarWhereInput | DetalleComandaScalarWhereInput[]
    OR?: DetalleComandaScalarWhereInput[]
    NOT?: DetalleComandaScalarWhereInput | DetalleComandaScalarWhereInput[]
    id_detalle?: IntFilter<"DetalleComanda"> | number
    id_comanda?: IntFilter<"DetalleComanda"> | number
    id_producto?: IntFilter<"DetalleComanda"> | number
    cantidad?: IntFilter<"DetalleComanda"> | number
    notas_especiales?: StringNullableFilter<"DetalleComanda"> | string | null
    status?: StringFilter<"DetalleComanda"> | string
    hora?: IntNullableFilter<"DetalleComanda"> | number | null
  }

  export type HistorialAnaliticoUpsertWithWhereUniqueWithoutProductoInput = {
    where: HistorialAnaliticoWhereUniqueInput
    update: XOR<HistorialAnaliticoUpdateWithoutProductoInput, HistorialAnaliticoUncheckedUpdateWithoutProductoInput>
    create: XOR<HistorialAnaliticoCreateWithoutProductoInput, HistorialAnaliticoUncheckedCreateWithoutProductoInput>
  }

  export type HistorialAnaliticoUpdateWithWhereUniqueWithoutProductoInput = {
    where: HistorialAnaliticoWhereUniqueInput
    data: XOR<HistorialAnaliticoUpdateWithoutProductoInput, HistorialAnaliticoUncheckedUpdateWithoutProductoInput>
  }

  export type HistorialAnaliticoUpdateManyWithWhereWithoutProductoInput = {
    where: HistorialAnaliticoScalarWhereInput
    data: XOR<HistorialAnaliticoUpdateManyMutationInput, HistorialAnaliticoUncheckedUpdateManyWithoutProductoInput>
  }

  export type HistorialAnaliticoScalarWhereInput = {
    AND?: HistorialAnaliticoScalarWhereInput | HistorialAnaliticoScalarWhereInput[]
    OR?: HistorialAnaliticoScalarWhereInput[]
    NOT?: HistorialAnaliticoScalarWhereInput | HistorialAnaliticoScalarWhereInput[]
    id_historial?: IntFilter<"HistorialAnalitico"> | number
    id_producto?: IntFilter<"HistorialAnalitico"> | number
    id_subcategoria?: IntFilter<"HistorialAnalitico"> | number
    id_categoria?: IntFilter<"HistorialAnalitico"> | number
    hora?: IntFilter<"HistorialAnalitico"> | number
    dia_semana?: IntFilter<"HistorialAnalitico"> | number
    es_festivo?: BoolFilter<"HistorialAnalitico"> | boolean
    clima_id?: IntFilter<"HistorialAnalitico"> | number
    fecha_registro?: DateTimeNullableFilter<"HistorialAnalitico"> | Date | string | null
  }

  export type ProductoAditamentosUpsertWithWhereUniqueWithoutProductoInput = {
    where: ProductoAditamentosWhereUniqueInput
    update: XOR<ProductoAditamentosUpdateWithoutProductoInput, ProductoAditamentosUncheckedUpdateWithoutProductoInput>
    create: XOR<ProductoAditamentosCreateWithoutProductoInput, ProductoAditamentosUncheckedCreateWithoutProductoInput>
  }

  export type ProductoAditamentosUpdateWithWhereUniqueWithoutProductoInput = {
    where: ProductoAditamentosWhereUniqueInput
    data: XOR<ProductoAditamentosUpdateWithoutProductoInput, ProductoAditamentosUncheckedUpdateWithoutProductoInput>
  }

  export type ProductoAditamentosUpdateManyWithWhereWithoutProductoInput = {
    where: ProductoAditamentosScalarWhereInput
    data: XOR<ProductoAditamentosUpdateManyMutationInput, ProductoAditamentosUncheckedUpdateManyWithoutProductoInput>
  }

  export type ProductoAditamentosScalarWhereInput = {
    AND?: ProductoAditamentosScalarWhereInput | ProductoAditamentosScalarWhereInput[]
    OR?: ProductoAditamentosScalarWhereInput[]
    NOT?: ProductoAditamentosScalarWhereInput | ProductoAditamentosScalarWhereInput[]
    id_producto?: IntFilter<"ProductoAditamentos"> | number
    id_aditamento?: IntFilter<"ProductoAditamentos"> | number
  }

  export type ProductoImagenUpsertWithWhereUniqueWithoutProductoInput = {
    where: ProductoImagenWhereUniqueInput
    update: XOR<ProductoImagenUpdateWithoutProductoInput, ProductoImagenUncheckedUpdateWithoutProductoInput>
    create: XOR<ProductoImagenCreateWithoutProductoInput, ProductoImagenUncheckedCreateWithoutProductoInput>
  }

  export type ProductoImagenUpdateWithWhereUniqueWithoutProductoInput = {
    where: ProductoImagenWhereUniqueInput
    data: XOR<ProductoImagenUpdateWithoutProductoInput, ProductoImagenUncheckedUpdateWithoutProductoInput>
  }

  export type ProductoImagenUpdateManyWithWhereWithoutProductoInput = {
    where: ProductoImagenScalarWhereInput
    data: XOR<ProductoImagenUpdateManyMutationInput, ProductoImagenUncheckedUpdateManyWithoutProductoInput>
  }

  export type ProductoImagenScalarWhereInput = {
    AND?: ProductoImagenScalarWhereInput | ProductoImagenScalarWhereInput[]
    OR?: ProductoImagenScalarWhereInput[]
    NOT?: ProductoImagenScalarWhereInput | ProductoImagenScalarWhereInput[]
    id_imagen?: IntFilter<"ProductoImagen"> | number
    url?: StringFilter<"ProductoImagen"> | string
    id_producto?: IntFilter<"ProductoImagen"> | number
  }

  export type CategoriaUpsertWithoutProductosInput = {
    update: XOR<CategoriaUpdateWithoutProductosInput, CategoriaUncheckedUpdateWithoutProductosInput>
    create: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    where?: CategoriaWhereInput
  }

  export type CategoriaUpdateToOneWithWhereWithoutProductosInput = {
    where?: CategoriaWhereInput
    data: XOR<CategoriaUpdateWithoutProductosInput, CategoriaUncheckedUpdateWithoutProductosInput>
  }

  export type CategoriaUpdateWithoutProductosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    historial?: HistorialAnaliticoUpdateManyWithoutCategoriaNestedInput
    subcategorias?: SubCategoriaUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateWithoutProductosInput = {
    id_categoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    historial?: HistorialAnaliticoUncheckedUpdateManyWithoutCategoriaNestedInput
    subcategorias?: SubCategoriaUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type SubCategoriaUpsertWithoutProductosInput = {
    update: XOR<SubCategoriaUpdateWithoutProductosInput, SubCategoriaUncheckedUpdateWithoutProductosInput>
    create: XOR<SubCategoriaCreateWithoutProductosInput, SubCategoriaUncheckedCreateWithoutProductosInput>
    where?: SubCategoriaWhereInput
  }

  export type SubCategoriaUpdateToOneWithWhereWithoutProductosInput = {
    where?: SubCategoriaWhereInput
    data: XOR<SubCategoriaUpdateWithoutProductosInput, SubCategoriaUncheckedUpdateWithoutProductosInput>
  }

  export type SubCategoriaUpdateWithoutProductosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    historial_analitico?: HistorialAnaliticoUpdateManyWithoutSubcategoriasNestedInput
    categoria?: CategoriaUpdateOneRequiredWithoutSubcategoriasNestedInput
  }

  export type SubCategoriaUncheckedUpdateWithoutProductosInput = {
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    id_categoria?: IntFieldUpdateOperationsInput | number
    historial_analitico?: HistorialAnaliticoUncheckedUpdateManyWithoutSubcategoriasNestedInput
  }

  export type ComandaAditamentosCreateWithoutAditamentoInput = {
    confirmacion?: boolean
    detalle: DetalleComandaCreateNestedOneWithoutAditamentosInput
  }

  export type ComandaAditamentosUncheckedCreateWithoutAditamentoInput = {
    id_detalle: number
    confirmacion?: boolean
  }

  export type ComandaAditamentosCreateOrConnectWithoutAditamentoInput = {
    where: ComandaAditamentosWhereUniqueInput
    create: XOR<ComandaAditamentosCreateWithoutAditamentoInput, ComandaAditamentosUncheckedCreateWithoutAditamentoInput>
  }

  export type ComandaAditamentosCreateManyAditamentoInputEnvelope = {
    data: ComandaAditamentosCreateManyAditamentoInput | ComandaAditamentosCreateManyAditamentoInput[]
    skipDuplicates?: boolean
  }

  export type ProductoAditamentosCreateWithoutAditamentoInput = {
    producto: ProductoCreateNestedOneWithoutAditamentosInput
  }

  export type ProductoAditamentosUncheckedCreateWithoutAditamentoInput = {
    id_producto: number
  }

  export type ProductoAditamentosCreateOrConnectWithoutAditamentoInput = {
    where: ProductoAditamentosWhereUniqueInput
    create: XOR<ProductoAditamentosCreateWithoutAditamentoInput, ProductoAditamentosUncheckedCreateWithoutAditamentoInput>
  }

  export type ProductoAditamentosCreateManyAditamentoInputEnvelope = {
    data: ProductoAditamentosCreateManyAditamentoInput | ProductoAditamentosCreateManyAditamentoInput[]
    skipDuplicates?: boolean
  }

  export type ComandaAditamentosUpsertWithWhereUniqueWithoutAditamentoInput = {
    where: ComandaAditamentosWhereUniqueInput
    update: XOR<ComandaAditamentosUpdateWithoutAditamentoInput, ComandaAditamentosUncheckedUpdateWithoutAditamentoInput>
    create: XOR<ComandaAditamentosCreateWithoutAditamentoInput, ComandaAditamentosUncheckedCreateWithoutAditamentoInput>
  }

  export type ComandaAditamentosUpdateWithWhereUniqueWithoutAditamentoInput = {
    where: ComandaAditamentosWhereUniqueInput
    data: XOR<ComandaAditamentosUpdateWithoutAditamentoInput, ComandaAditamentosUncheckedUpdateWithoutAditamentoInput>
  }

  export type ComandaAditamentosUpdateManyWithWhereWithoutAditamentoInput = {
    where: ComandaAditamentosScalarWhereInput
    data: XOR<ComandaAditamentosUpdateManyMutationInput, ComandaAditamentosUncheckedUpdateManyWithoutAditamentoInput>
  }

  export type ComandaAditamentosScalarWhereInput = {
    AND?: ComandaAditamentosScalarWhereInput | ComandaAditamentosScalarWhereInput[]
    OR?: ComandaAditamentosScalarWhereInput[]
    NOT?: ComandaAditamentosScalarWhereInput | ComandaAditamentosScalarWhereInput[]
    id_detalle?: IntFilter<"ComandaAditamentos"> | number
    id_aditamento?: IntFilter<"ComandaAditamentos"> | number
    confirmacion?: BoolFilter<"ComandaAditamentos"> | boolean
  }

  export type ProductoAditamentosUpsertWithWhereUniqueWithoutAditamentoInput = {
    where: ProductoAditamentosWhereUniqueInput
    update: XOR<ProductoAditamentosUpdateWithoutAditamentoInput, ProductoAditamentosUncheckedUpdateWithoutAditamentoInput>
    create: XOR<ProductoAditamentosCreateWithoutAditamentoInput, ProductoAditamentosUncheckedCreateWithoutAditamentoInput>
  }

  export type ProductoAditamentosUpdateWithWhereUniqueWithoutAditamentoInput = {
    where: ProductoAditamentosWhereUniqueInput
    data: XOR<ProductoAditamentosUpdateWithoutAditamentoInput, ProductoAditamentosUncheckedUpdateWithoutAditamentoInput>
  }

  export type ProductoAditamentosUpdateManyWithWhereWithoutAditamentoInput = {
    where: ProductoAditamentosScalarWhereInput
    data: XOR<ProductoAditamentosUpdateManyMutationInput, ProductoAditamentosUncheckedUpdateManyWithoutAditamentoInput>
  }

  export type AditamentoCreateWithoutProductosInput = {
    nombre: string
    precio?: number
    comandas?: ComandaAditamentosCreateNestedManyWithoutAditamentoInput
  }

  export type AditamentoUncheckedCreateWithoutProductosInput = {
    id_aditamento?: number
    nombre: string
    precio?: number
    comandas?: ComandaAditamentosUncheckedCreateNestedManyWithoutAditamentoInput
  }

  export type AditamentoCreateOrConnectWithoutProductosInput = {
    where: AditamentoWhereUniqueInput
    create: XOR<AditamentoCreateWithoutProductosInput, AditamentoUncheckedCreateWithoutProductosInput>
  }

  export type ProductoCreateWithoutAditamentosInput = {
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaCreateNestedManyWithoutProductoInput
    historial?: HistorialAnaliticoCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenCreateNestedManyWithoutProductoInput
    categoriaRel: CategoriaCreateNestedOneWithoutProductosInput
    subcategoria: SubCategoriaCreateNestedOneWithoutProductosInput
  }

  export type ProductoUncheckedCreateWithoutAditamentosInput = {
    id_producto?: number
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    id_categoria: number
    id_subcategoria: number
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaUncheckedCreateNestedManyWithoutProductoInput
    historial?: HistorialAnaliticoUncheckedCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutAditamentosInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutAditamentosInput, ProductoUncheckedCreateWithoutAditamentosInput>
  }

  export type AditamentoUpsertWithoutProductosInput = {
    update: XOR<AditamentoUpdateWithoutProductosInput, AditamentoUncheckedUpdateWithoutProductosInput>
    create: XOR<AditamentoCreateWithoutProductosInput, AditamentoUncheckedCreateWithoutProductosInput>
    where?: AditamentoWhereInput
  }

  export type AditamentoUpdateToOneWithWhereWithoutProductosInput = {
    where?: AditamentoWhereInput
    data: XOR<AditamentoUpdateWithoutProductosInput, AditamentoUncheckedUpdateWithoutProductosInput>
  }

  export type AditamentoUpdateWithoutProductosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    comandas?: ComandaAditamentosUpdateManyWithoutAditamentoNestedInput
  }

  export type AditamentoUncheckedUpdateWithoutProductosInput = {
    id_aditamento?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    comandas?: ComandaAditamentosUncheckedUpdateManyWithoutAditamentoNestedInput
  }

  export type ProductoUpsertWithoutAditamentosInput = {
    update: XOR<ProductoUpdateWithoutAditamentosInput, ProductoUncheckedUpdateWithoutAditamentosInput>
    create: XOR<ProductoCreateWithoutAditamentosInput, ProductoUncheckedCreateWithoutAditamentosInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutAditamentosInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutAditamentosInput, ProductoUncheckedUpdateWithoutAditamentosInput>
  }

  export type ProductoUpdateWithoutAditamentosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUpdateManyWithoutProductoNestedInput
    historial?: HistorialAnaliticoUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUpdateManyWithoutProductoNestedInput
    categoriaRel?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    subcategoria?: SubCategoriaUpdateOneRequiredWithoutProductosNestedInput
  }

  export type ProductoUncheckedUpdateWithoutAditamentosInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_categoria?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUncheckedUpdateManyWithoutProductoNestedInput
    historial?: HistorialAnaliticoUncheckedUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type MesaCreateWithoutComandasInput = {
    numero_mesa: number
    capacidad?: number
    estado?: string
    junta_id_mesa?: number | null
  }

  export type MesaUncheckedCreateWithoutComandasInput = {
    id_mesa?: number
    numero_mesa: number
    capacidad?: number
    estado?: string
    junta_id_mesa?: number | null
  }

  export type MesaCreateOrConnectWithoutComandasInput = {
    where: MesaWhereUniqueInput
    create: XOR<MesaCreateWithoutComandasInput, MesaUncheckedCreateWithoutComandasInput>
  }

  export type MeseroCreateWithoutComandasInput = {
    nombre: string
    turno: string
  }

  export type MeseroUncheckedCreateWithoutComandasInput = {
    id_mesero?: number
    nombre: string
    turno: string
  }

  export type MeseroCreateOrConnectWithoutComandasInput = {
    where: MeseroWhereUniqueInput
    create: XOR<MeseroCreateWithoutComandasInput, MeseroUncheckedCreateWithoutComandasInput>
  }

  export type DetalleComandaCreateWithoutComandaInput = {
    cantidad?: number
    notas_especiales?: string | null
    status?: string
    hora?: number | null
    aditamentos?: ComandaAditamentosCreateNestedManyWithoutDetalleInput
    producto: ProductoCreateNestedOneWithoutDetallesInput
  }

  export type DetalleComandaUncheckedCreateWithoutComandaInput = {
    id_detalle?: number
    id_producto: number
    cantidad?: number
    notas_especiales?: string | null
    status?: string
    hora?: number | null
    aditamentos?: ComandaAditamentosUncheckedCreateNestedManyWithoutDetalleInput
  }

  export type DetalleComandaCreateOrConnectWithoutComandaInput = {
    where: DetalleComandaWhereUniqueInput
    create: XOR<DetalleComandaCreateWithoutComandaInput, DetalleComandaUncheckedCreateWithoutComandaInput>
  }

  export type DetalleComandaCreateManyComandaInputEnvelope = {
    data: DetalleComandaCreateManyComandaInput | DetalleComandaCreateManyComandaInput[]
    skipDuplicates?: boolean
  }

  export type MesaUpsertWithoutComandasInput = {
    update: XOR<MesaUpdateWithoutComandasInput, MesaUncheckedUpdateWithoutComandasInput>
    create: XOR<MesaCreateWithoutComandasInput, MesaUncheckedCreateWithoutComandasInput>
    where?: MesaWhereInput
  }

  export type MesaUpdateToOneWithWhereWithoutComandasInput = {
    where?: MesaWhereInput
    data: XOR<MesaUpdateWithoutComandasInput, MesaUncheckedUpdateWithoutComandasInput>
  }

  export type MesaUpdateWithoutComandasInput = {
    numero_mesa?: IntFieldUpdateOperationsInput | number
    capacidad?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    junta_id_mesa?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MesaUncheckedUpdateWithoutComandasInput = {
    id_mesa?: IntFieldUpdateOperationsInput | number
    numero_mesa?: IntFieldUpdateOperationsInput | number
    capacidad?: IntFieldUpdateOperationsInput | number
    estado?: StringFieldUpdateOperationsInput | string
    junta_id_mesa?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MeseroUpsertWithoutComandasInput = {
    update: XOR<MeseroUpdateWithoutComandasInput, MeseroUncheckedUpdateWithoutComandasInput>
    create: XOR<MeseroCreateWithoutComandasInput, MeseroUncheckedCreateWithoutComandasInput>
    where?: MeseroWhereInput
  }

  export type MeseroUpdateToOneWithWhereWithoutComandasInput = {
    where?: MeseroWhereInput
    data: XOR<MeseroUpdateWithoutComandasInput, MeseroUncheckedUpdateWithoutComandasInput>
  }

  export type MeseroUpdateWithoutComandasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    turno?: StringFieldUpdateOperationsInput | string
  }

  export type MeseroUncheckedUpdateWithoutComandasInput = {
    id_mesero?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    turno?: StringFieldUpdateOperationsInput | string
  }

  export type DetalleComandaUpsertWithWhereUniqueWithoutComandaInput = {
    where: DetalleComandaWhereUniqueInput
    update: XOR<DetalleComandaUpdateWithoutComandaInput, DetalleComandaUncheckedUpdateWithoutComandaInput>
    create: XOR<DetalleComandaCreateWithoutComandaInput, DetalleComandaUncheckedCreateWithoutComandaInput>
  }

  export type DetalleComandaUpdateWithWhereUniqueWithoutComandaInput = {
    where: DetalleComandaWhereUniqueInput
    data: XOR<DetalleComandaUpdateWithoutComandaInput, DetalleComandaUncheckedUpdateWithoutComandaInput>
  }

  export type DetalleComandaUpdateManyWithWhereWithoutComandaInput = {
    where: DetalleComandaScalarWhereInput
    data: XOR<DetalleComandaUpdateManyMutationInput, DetalleComandaUncheckedUpdateManyWithoutComandaInput>
  }

  export type ComandaAditamentosCreateWithoutDetalleInput = {
    confirmacion?: boolean
    aditamento: AditamentoCreateNestedOneWithoutComandasInput
  }

  export type ComandaAditamentosUncheckedCreateWithoutDetalleInput = {
    id_aditamento: number
    confirmacion?: boolean
  }

  export type ComandaAditamentosCreateOrConnectWithoutDetalleInput = {
    where: ComandaAditamentosWhereUniqueInput
    create: XOR<ComandaAditamentosCreateWithoutDetalleInput, ComandaAditamentosUncheckedCreateWithoutDetalleInput>
  }

  export type ComandaAditamentosCreateManyDetalleInputEnvelope = {
    data: ComandaAditamentosCreateManyDetalleInput | ComandaAditamentosCreateManyDetalleInput[]
    skipDuplicates?: boolean
  }

  export type ComandasCreateWithoutDetallesInput = {
    fecha_hora?: Date | string | null
    estado?: string
    token?: string | null
    fecha_pagado?: Date | string | null
    impuestos?: number
    pagado?: boolean
    sub_total?: number
    total?: number
    transaccion_id?: string | null
    metodo_pago?: string | null
    mesa: MesaCreateNestedOneWithoutComandasInput
    mesero: MeseroCreateNestedOneWithoutComandasInput
  }

  export type ComandasUncheckedCreateWithoutDetallesInput = {
    id_comanda?: number
    id_mesa: number
    id_mesero: number
    fecha_hora?: Date | string | null
    estado?: string
    token?: string | null
    fecha_pagado?: Date | string | null
    impuestos?: number
    pagado?: boolean
    sub_total?: number
    total?: number
    transaccion_id?: string | null
    metodo_pago?: string | null
  }

  export type ComandasCreateOrConnectWithoutDetallesInput = {
    where: ComandasWhereUniqueInput
    create: XOR<ComandasCreateWithoutDetallesInput, ComandasUncheckedCreateWithoutDetallesInput>
  }

  export type ProductoCreateWithoutDetallesInput = {
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    historial?: HistorialAnaliticoCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenCreateNestedManyWithoutProductoInput
    categoriaRel: CategoriaCreateNestedOneWithoutProductosInput
    subcategoria: SubCategoriaCreateNestedOneWithoutProductosInput
  }

  export type ProductoUncheckedCreateWithoutDetallesInput = {
    id_producto?: number
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    id_categoria: number
    id_subcategoria: number
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    historial?: HistorialAnaliticoUncheckedCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosUncheckedCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutDetallesInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutDetallesInput, ProductoUncheckedCreateWithoutDetallesInput>
  }

  export type ComandaAditamentosUpsertWithWhereUniqueWithoutDetalleInput = {
    where: ComandaAditamentosWhereUniqueInput
    update: XOR<ComandaAditamentosUpdateWithoutDetalleInput, ComandaAditamentosUncheckedUpdateWithoutDetalleInput>
    create: XOR<ComandaAditamentosCreateWithoutDetalleInput, ComandaAditamentosUncheckedCreateWithoutDetalleInput>
  }

  export type ComandaAditamentosUpdateWithWhereUniqueWithoutDetalleInput = {
    where: ComandaAditamentosWhereUniqueInput
    data: XOR<ComandaAditamentosUpdateWithoutDetalleInput, ComandaAditamentosUncheckedUpdateWithoutDetalleInput>
  }

  export type ComandaAditamentosUpdateManyWithWhereWithoutDetalleInput = {
    where: ComandaAditamentosScalarWhereInput
    data: XOR<ComandaAditamentosUpdateManyMutationInput, ComandaAditamentosUncheckedUpdateManyWithoutDetalleInput>
  }

  export type ComandasUpsertWithoutDetallesInput = {
    update: XOR<ComandasUpdateWithoutDetallesInput, ComandasUncheckedUpdateWithoutDetallesInput>
    create: XOR<ComandasCreateWithoutDetallesInput, ComandasUncheckedCreateWithoutDetallesInput>
    where?: ComandasWhereInput
  }

  export type ComandasUpdateToOneWithWhereWithoutDetallesInput = {
    where?: ComandasWhereInput
    data: XOR<ComandasUpdateWithoutDetallesInput, ComandasUncheckedUpdateWithoutDetallesInput>
  }

  export type ComandasUpdateWithoutDetallesInput = {
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    mesa?: MesaUpdateOneRequiredWithoutComandasNestedInput
    mesero?: MeseroUpdateOneRequiredWithoutComandasNestedInput
  }

  export type ComandasUncheckedUpdateWithoutDetallesInput = {
    id_comanda?: IntFieldUpdateOperationsInput | number
    id_mesa?: IntFieldUpdateOperationsInput | number
    id_mesero?: IntFieldUpdateOperationsInput | number
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductoUpsertWithoutDetallesInput = {
    update: XOR<ProductoUpdateWithoutDetallesInput, ProductoUncheckedUpdateWithoutDetallesInput>
    create: XOR<ProductoCreateWithoutDetallesInput, ProductoUncheckedCreateWithoutDetallesInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutDetallesInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutDetallesInput, ProductoUncheckedUpdateWithoutDetallesInput>
  }

  export type ProductoUpdateWithoutDetallesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    historial?: HistorialAnaliticoUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUpdateManyWithoutProductoNestedInput
    categoriaRel?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    subcategoria?: SubCategoriaUpdateOneRequiredWithoutProductosNestedInput
  }

  export type ProductoUncheckedUpdateWithoutDetallesInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_categoria?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    historial?: HistorialAnaliticoUncheckedUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUncheckedUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type AditamentoCreateWithoutComandasInput = {
    nombre: string
    precio?: number
    productos?: ProductoAditamentosCreateNestedManyWithoutAditamentoInput
  }

  export type AditamentoUncheckedCreateWithoutComandasInput = {
    id_aditamento?: number
    nombre: string
    precio?: number
    productos?: ProductoAditamentosUncheckedCreateNestedManyWithoutAditamentoInput
  }

  export type AditamentoCreateOrConnectWithoutComandasInput = {
    where: AditamentoWhereUniqueInput
    create: XOR<AditamentoCreateWithoutComandasInput, AditamentoUncheckedCreateWithoutComandasInput>
  }

  export type DetalleComandaCreateWithoutAditamentosInput = {
    cantidad?: number
    notas_especiales?: string | null
    status?: string
    hora?: number | null
    comanda: ComandasCreateNestedOneWithoutDetallesInput
    producto: ProductoCreateNestedOneWithoutDetallesInput
  }

  export type DetalleComandaUncheckedCreateWithoutAditamentosInput = {
    id_detalle?: number
    id_comanda: number
    id_producto: number
    cantidad?: number
    notas_especiales?: string | null
    status?: string
    hora?: number | null
  }

  export type DetalleComandaCreateOrConnectWithoutAditamentosInput = {
    where: DetalleComandaWhereUniqueInput
    create: XOR<DetalleComandaCreateWithoutAditamentosInput, DetalleComandaUncheckedCreateWithoutAditamentosInput>
  }

  export type AditamentoUpsertWithoutComandasInput = {
    update: XOR<AditamentoUpdateWithoutComandasInput, AditamentoUncheckedUpdateWithoutComandasInput>
    create: XOR<AditamentoCreateWithoutComandasInput, AditamentoUncheckedCreateWithoutComandasInput>
    where?: AditamentoWhereInput
  }

  export type AditamentoUpdateToOneWithWhereWithoutComandasInput = {
    where?: AditamentoWhereInput
    data: XOR<AditamentoUpdateWithoutComandasInput, AditamentoUncheckedUpdateWithoutComandasInput>
  }

  export type AditamentoUpdateWithoutComandasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    productos?: ProductoAditamentosUpdateManyWithoutAditamentoNestedInput
  }

  export type AditamentoUncheckedUpdateWithoutComandasInput = {
    id_aditamento?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: FloatFieldUpdateOperationsInput | number
    productos?: ProductoAditamentosUncheckedUpdateManyWithoutAditamentoNestedInput
  }

  export type DetalleComandaUpsertWithoutAditamentosInput = {
    update: XOR<DetalleComandaUpdateWithoutAditamentosInput, DetalleComandaUncheckedUpdateWithoutAditamentosInput>
    create: XOR<DetalleComandaCreateWithoutAditamentosInput, DetalleComandaUncheckedCreateWithoutAditamentosInput>
    where?: DetalleComandaWhereInput
  }

  export type DetalleComandaUpdateToOneWithWhereWithoutAditamentosInput = {
    where?: DetalleComandaWhereInput
    data: XOR<DetalleComandaUpdateWithoutAditamentosInput, DetalleComandaUncheckedUpdateWithoutAditamentosInput>
  }

  export type DetalleComandaUpdateWithoutAditamentosInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
    comanda?: ComandasUpdateOneRequiredWithoutDetallesNestedInput
    producto?: ProductoUpdateOneRequiredWithoutDetallesNestedInput
  }

  export type DetalleComandaUncheckedUpdateWithoutAditamentosInput = {
    id_detalle?: IntFieldUpdateOperationsInput | number
    id_comanda?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductoCreateWithoutImagenInput = {
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaCreateNestedManyWithoutProductoInput
    historial?: HistorialAnaliticoCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosCreateNestedManyWithoutProductoInput
    categoriaRel: CategoriaCreateNestedOneWithoutProductosInput
    subcategoria: SubCategoriaCreateNestedOneWithoutProductosInput
  }

  export type ProductoUncheckedCreateWithoutImagenInput = {
    id_producto?: number
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    id_categoria: number
    id_subcategoria: number
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaUncheckedCreateNestedManyWithoutProductoInput
    historial?: HistorialAnaliticoUncheckedCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutImagenInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutImagenInput, ProductoUncheckedCreateWithoutImagenInput>
  }

  export type ProductoUpsertWithoutImagenInput = {
    update: XOR<ProductoUpdateWithoutImagenInput, ProductoUncheckedUpdateWithoutImagenInput>
    create: XOR<ProductoCreateWithoutImagenInput, ProductoUncheckedCreateWithoutImagenInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutImagenInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutImagenInput, ProductoUncheckedUpdateWithoutImagenInput>
  }

  export type ProductoUpdateWithoutImagenInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUpdateManyWithoutProductoNestedInput
    historial?: HistorialAnaliticoUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUpdateManyWithoutProductoNestedInput
    categoriaRel?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    subcategoria?: SubCategoriaUpdateOneRequiredWithoutProductosNestedInput
  }

  export type ProductoUncheckedUpdateWithoutImagenInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_categoria?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUncheckedUpdateManyWithoutProductoNestedInput
    historial?: HistorialAnaliticoUncheckedUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type CategoriaCreateWithoutHistorialInput = {
    nombre: string
    productos?: ProductoCreateNestedManyWithoutCategoriaRelInput
    subcategorias?: SubCategoriaCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateWithoutHistorialInput = {
    id_categoria?: number
    nombre: string
    productos?: ProductoUncheckedCreateNestedManyWithoutCategoriaRelInput
    subcategorias?: SubCategoriaUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaCreateOrConnectWithoutHistorialInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutHistorialInput, CategoriaUncheckedCreateWithoutHistorialInput>
  }

  export type ProductoCreateWithoutHistorialInput = {
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenCreateNestedManyWithoutProductoInput
    categoriaRel: CategoriaCreateNestedOneWithoutProductosInput
    subcategoria: SubCategoriaCreateNestedOneWithoutProductosInput
  }

  export type ProductoUncheckedCreateWithoutHistorialInput = {
    id_producto?: number
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    id_categoria: number
    id_subcategoria: number
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaUncheckedCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosUncheckedCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutHistorialInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutHistorialInput, ProductoUncheckedCreateWithoutHistorialInput>
  }

  export type SubCategoriaCreateWithoutHistorial_analiticoInput = {
    nombre: string
    productos?: ProductoCreateNestedManyWithoutSubcategoriaInput
    categoria: CategoriaCreateNestedOneWithoutSubcategoriasInput
  }

  export type SubCategoriaUncheckedCreateWithoutHistorial_analiticoInput = {
    id_subcategoria?: number
    nombre: string
    id_categoria: number
    productos?: ProductoUncheckedCreateNestedManyWithoutSubcategoriaInput
  }

  export type SubCategoriaCreateOrConnectWithoutHistorial_analiticoInput = {
    where: SubCategoriaWhereUniqueInput
    create: XOR<SubCategoriaCreateWithoutHistorial_analiticoInput, SubCategoriaUncheckedCreateWithoutHistorial_analiticoInput>
  }

  export type CategoriaUpsertWithoutHistorialInput = {
    update: XOR<CategoriaUpdateWithoutHistorialInput, CategoriaUncheckedUpdateWithoutHistorialInput>
    create: XOR<CategoriaCreateWithoutHistorialInput, CategoriaUncheckedCreateWithoutHistorialInput>
    where?: CategoriaWhereInput
  }

  export type CategoriaUpdateToOneWithWhereWithoutHistorialInput = {
    where?: CategoriaWhereInput
    data: XOR<CategoriaUpdateWithoutHistorialInput, CategoriaUncheckedUpdateWithoutHistorialInput>
  }

  export type CategoriaUpdateWithoutHistorialInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    productos?: ProductoUpdateManyWithoutCategoriaRelNestedInput
    subcategorias?: SubCategoriaUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateWithoutHistorialInput = {
    id_categoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    productos?: ProductoUncheckedUpdateManyWithoutCategoriaRelNestedInput
    subcategorias?: SubCategoriaUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type ProductoUpsertWithoutHistorialInput = {
    update: XOR<ProductoUpdateWithoutHistorialInput, ProductoUncheckedUpdateWithoutHistorialInput>
    create: XOR<ProductoCreateWithoutHistorialInput, ProductoUncheckedCreateWithoutHistorialInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutHistorialInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutHistorialInput, ProductoUncheckedUpdateWithoutHistorialInput>
  }

  export type ProductoUpdateWithoutHistorialInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUpdateManyWithoutProductoNestedInput
    categoriaRel?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    subcategoria?: SubCategoriaUpdateOneRequiredWithoutProductosNestedInput
  }

  export type ProductoUncheckedUpdateWithoutHistorialInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_categoria?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUncheckedUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUncheckedUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type SubCategoriaUpsertWithoutHistorial_analiticoInput = {
    update: XOR<SubCategoriaUpdateWithoutHistorial_analiticoInput, SubCategoriaUncheckedUpdateWithoutHistorial_analiticoInput>
    create: XOR<SubCategoriaCreateWithoutHistorial_analiticoInput, SubCategoriaUncheckedCreateWithoutHistorial_analiticoInput>
    where?: SubCategoriaWhereInput
  }

  export type SubCategoriaUpdateToOneWithWhereWithoutHistorial_analiticoInput = {
    where?: SubCategoriaWhereInput
    data: XOR<SubCategoriaUpdateWithoutHistorial_analiticoInput, SubCategoriaUncheckedUpdateWithoutHistorial_analiticoInput>
  }

  export type SubCategoriaUpdateWithoutHistorial_analiticoInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    productos?: ProductoUpdateManyWithoutSubcategoriaNestedInput
    categoria?: CategoriaUpdateOneRequiredWithoutSubcategoriasNestedInput
  }

  export type SubCategoriaUncheckedUpdateWithoutHistorial_analiticoInput = {
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    id_categoria?: IntFieldUpdateOperationsInput | number
    productos?: ProductoUncheckedUpdateManyWithoutSubcategoriaNestedInput
  }

  export type HistorialAnaliticoCreateWithoutCategoriaInput = {
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
    producto: ProductoCreateNestedOneWithoutHistorialInput
    subcategorias: SubCategoriaCreateNestedOneWithoutHistorial_analiticoInput
  }

  export type HistorialAnaliticoUncheckedCreateWithoutCategoriaInput = {
    id_historial?: number
    id_producto: number
    id_subcategoria: number
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
  }

  export type HistorialAnaliticoCreateOrConnectWithoutCategoriaInput = {
    where: HistorialAnaliticoWhereUniqueInput
    create: XOR<HistorialAnaliticoCreateWithoutCategoriaInput, HistorialAnaliticoUncheckedCreateWithoutCategoriaInput>
  }

  export type HistorialAnaliticoCreateManyCategoriaInputEnvelope = {
    data: HistorialAnaliticoCreateManyCategoriaInput | HistorialAnaliticoCreateManyCategoriaInput[]
    skipDuplicates?: boolean
  }

  export type ProductoCreateWithoutCategoriaRelInput = {
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaCreateNestedManyWithoutProductoInput
    historial?: HistorialAnaliticoCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenCreateNestedManyWithoutProductoInput
    subcategoria: SubCategoriaCreateNestedOneWithoutProductosInput
  }

  export type ProductoUncheckedCreateWithoutCategoriaRelInput = {
    id_producto?: number
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    id_subcategoria: number
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaUncheckedCreateNestedManyWithoutProductoInput
    historial?: HistorialAnaliticoUncheckedCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosUncheckedCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutCategoriaRelInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutCategoriaRelInput, ProductoUncheckedCreateWithoutCategoriaRelInput>
  }

  export type ProductoCreateManyCategoriaRelInputEnvelope = {
    data: ProductoCreateManyCategoriaRelInput | ProductoCreateManyCategoriaRelInput[]
    skipDuplicates?: boolean
  }

  export type SubCategoriaCreateWithoutCategoriaInput = {
    nombre: string
    historial_analitico?: HistorialAnaliticoCreateNestedManyWithoutSubcategoriasInput
    productos?: ProductoCreateNestedManyWithoutSubcategoriaInput
  }

  export type SubCategoriaUncheckedCreateWithoutCategoriaInput = {
    id_subcategoria?: number
    nombre: string
    historial_analitico?: HistorialAnaliticoUncheckedCreateNestedManyWithoutSubcategoriasInput
    productos?: ProductoUncheckedCreateNestedManyWithoutSubcategoriaInput
  }

  export type SubCategoriaCreateOrConnectWithoutCategoriaInput = {
    where: SubCategoriaWhereUniqueInput
    create: XOR<SubCategoriaCreateWithoutCategoriaInput, SubCategoriaUncheckedCreateWithoutCategoriaInput>
  }

  export type SubCategoriaCreateManyCategoriaInputEnvelope = {
    data: SubCategoriaCreateManyCategoriaInput | SubCategoriaCreateManyCategoriaInput[]
    skipDuplicates?: boolean
  }

  export type HistorialAnaliticoUpsertWithWhereUniqueWithoutCategoriaInput = {
    where: HistorialAnaliticoWhereUniqueInput
    update: XOR<HistorialAnaliticoUpdateWithoutCategoriaInput, HistorialAnaliticoUncheckedUpdateWithoutCategoriaInput>
    create: XOR<HistorialAnaliticoCreateWithoutCategoriaInput, HistorialAnaliticoUncheckedCreateWithoutCategoriaInput>
  }

  export type HistorialAnaliticoUpdateWithWhereUniqueWithoutCategoriaInput = {
    where: HistorialAnaliticoWhereUniqueInput
    data: XOR<HistorialAnaliticoUpdateWithoutCategoriaInput, HistorialAnaliticoUncheckedUpdateWithoutCategoriaInput>
  }

  export type HistorialAnaliticoUpdateManyWithWhereWithoutCategoriaInput = {
    where: HistorialAnaliticoScalarWhereInput
    data: XOR<HistorialAnaliticoUpdateManyMutationInput, HistorialAnaliticoUncheckedUpdateManyWithoutCategoriaInput>
  }

  export type ProductoUpsertWithWhereUniqueWithoutCategoriaRelInput = {
    where: ProductoWhereUniqueInput
    update: XOR<ProductoUpdateWithoutCategoriaRelInput, ProductoUncheckedUpdateWithoutCategoriaRelInput>
    create: XOR<ProductoCreateWithoutCategoriaRelInput, ProductoUncheckedCreateWithoutCategoriaRelInput>
  }

  export type ProductoUpdateWithWhereUniqueWithoutCategoriaRelInput = {
    where: ProductoWhereUniqueInput
    data: XOR<ProductoUpdateWithoutCategoriaRelInput, ProductoUncheckedUpdateWithoutCategoriaRelInput>
  }

  export type ProductoUpdateManyWithWhereWithoutCategoriaRelInput = {
    where: ProductoScalarWhereInput
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyWithoutCategoriaRelInput>
  }

  export type ProductoScalarWhereInput = {
    AND?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
    OR?: ProductoScalarWhereInput[]
    NOT?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
    id_producto?: IntFilter<"Producto"> | number
    nombre?: StringFilter<"Producto"> | string
    precio?: DecimalFilter<"Producto"> | Decimal | DecimalJsLike | number | string
    id_categoria?: IntFilter<"Producto"> | number
    id_subcategoria?: IntFilter<"Producto"> | number
    descripcion?: StringNullableFilter<"Producto"> | string | null
    tiempo_prep?: IntFilter<"Producto"> | number
    pasos?: StringNullableFilter<"Producto"> | string | null
    activo?: BoolFilter<"Producto"> | boolean
    eliminado?: BoolFilter<"Producto"> | boolean
  }

  export type SubCategoriaUpsertWithWhereUniqueWithoutCategoriaInput = {
    where: SubCategoriaWhereUniqueInput
    update: XOR<SubCategoriaUpdateWithoutCategoriaInput, SubCategoriaUncheckedUpdateWithoutCategoriaInput>
    create: XOR<SubCategoriaCreateWithoutCategoriaInput, SubCategoriaUncheckedCreateWithoutCategoriaInput>
  }

  export type SubCategoriaUpdateWithWhereUniqueWithoutCategoriaInput = {
    where: SubCategoriaWhereUniqueInput
    data: XOR<SubCategoriaUpdateWithoutCategoriaInput, SubCategoriaUncheckedUpdateWithoutCategoriaInput>
  }

  export type SubCategoriaUpdateManyWithWhereWithoutCategoriaInput = {
    where: SubCategoriaScalarWhereInput
    data: XOR<SubCategoriaUpdateManyMutationInput, SubCategoriaUncheckedUpdateManyWithoutCategoriaInput>
  }

  export type SubCategoriaScalarWhereInput = {
    AND?: SubCategoriaScalarWhereInput | SubCategoriaScalarWhereInput[]
    OR?: SubCategoriaScalarWhereInput[]
    NOT?: SubCategoriaScalarWhereInput | SubCategoriaScalarWhereInput[]
    id_subcategoria?: IntFilter<"SubCategoria"> | number
    nombre?: StringFilter<"SubCategoria"> | string
    id_categoria?: IntFilter<"SubCategoria"> | number
  }

  export type HistorialAnaliticoCreateWithoutSubcategoriasInput = {
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
    categoria: CategoriaCreateNestedOneWithoutHistorialInput
    producto: ProductoCreateNestedOneWithoutHistorialInput
  }

  export type HistorialAnaliticoUncheckedCreateWithoutSubcategoriasInput = {
    id_historial?: number
    id_producto: number
    id_categoria: number
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
  }

  export type HistorialAnaliticoCreateOrConnectWithoutSubcategoriasInput = {
    where: HistorialAnaliticoWhereUniqueInput
    create: XOR<HistorialAnaliticoCreateWithoutSubcategoriasInput, HistorialAnaliticoUncheckedCreateWithoutSubcategoriasInput>
  }

  export type HistorialAnaliticoCreateManySubcategoriasInputEnvelope = {
    data: HistorialAnaliticoCreateManySubcategoriasInput | HistorialAnaliticoCreateManySubcategoriasInput[]
    skipDuplicates?: boolean
  }

  export type ProductoCreateWithoutSubcategoriaInput = {
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaCreateNestedManyWithoutProductoInput
    historial?: HistorialAnaliticoCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenCreateNestedManyWithoutProductoInput
    categoriaRel: CategoriaCreateNestedOneWithoutProductosInput
  }

  export type ProductoUncheckedCreateWithoutSubcategoriaInput = {
    id_producto?: number
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    id_categoria: number
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
    detalles?: DetalleComandaUncheckedCreateNestedManyWithoutProductoInput
    historial?: HistorialAnaliticoUncheckedCreateNestedManyWithoutProductoInput
    aditamentos?: ProductoAditamentosUncheckedCreateNestedManyWithoutProductoInput
    imagen?: ProductoImagenUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutSubcategoriaInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutSubcategoriaInput, ProductoUncheckedCreateWithoutSubcategoriaInput>
  }

  export type ProductoCreateManySubcategoriaInputEnvelope = {
    data: ProductoCreateManySubcategoriaInput | ProductoCreateManySubcategoriaInput[]
    skipDuplicates?: boolean
  }

  export type CategoriaCreateWithoutSubcategoriasInput = {
    nombre: string
    historial?: HistorialAnaliticoCreateNestedManyWithoutCategoriaInput
    productos?: ProductoCreateNestedManyWithoutCategoriaRelInput
  }

  export type CategoriaUncheckedCreateWithoutSubcategoriasInput = {
    id_categoria?: number
    nombre: string
    historial?: HistorialAnaliticoUncheckedCreateNestedManyWithoutCategoriaInput
    productos?: ProductoUncheckedCreateNestedManyWithoutCategoriaRelInput
  }

  export type CategoriaCreateOrConnectWithoutSubcategoriasInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutSubcategoriasInput, CategoriaUncheckedCreateWithoutSubcategoriasInput>
  }

  export type HistorialAnaliticoUpsertWithWhereUniqueWithoutSubcategoriasInput = {
    where: HistorialAnaliticoWhereUniqueInput
    update: XOR<HistorialAnaliticoUpdateWithoutSubcategoriasInput, HistorialAnaliticoUncheckedUpdateWithoutSubcategoriasInput>
    create: XOR<HistorialAnaliticoCreateWithoutSubcategoriasInput, HistorialAnaliticoUncheckedCreateWithoutSubcategoriasInput>
  }

  export type HistorialAnaliticoUpdateWithWhereUniqueWithoutSubcategoriasInput = {
    where: HistorialAnaliticoWhereUniqueInput
    data: XOR<HistorialAnaliticoUpdateWithoutSubcategoriasInput, HistorialAnaliticoUncheckedUpdateWithoutSubcategoriasInput>
  }

  export type HistorialAnaliticoUpdateManyWithWhereWithoutSubcategoriasInput = {
    where: HistorialAnaliticoScalarWhereInput
    data: XOR<HistorialAnaliticoUpdateManyMutationInput, HistorialAnaliticoUncheckedUpdateManyWithoutSubcategoriasInput>
  }

  export type ProductoUpsertWithWhereUniqueWithoutSubcategoriaInput = {
    where: ProductoWhereUniqueInput
    update: XOR<ProductoUpdateWithoutSubcategoriaInput, ProductoUncheckedUpdateWithoutSubcategoriaInput>
    create: XOR<ProductoCreateWithoutSubcategoriaInput, ProductoUncheckedCreateWithoutSubcategoriaInput>
  }

  export type ProductoUpdateWithWhereUniqueWithoutSubcategoriaInput = {
    where: ProductoWhereUniqueInput
    data: XOR<ProductoUpdateWithoutSubcategoriaInput, ProductoUncheckedUpdateWithoutSubcategoriaInput>
  }

  export type ProductoUpdateManyWithWhereWithoutSubcategoriaInput = {
    where: ProductoScalarWhereInput
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyWithoutSubcategoriaInput>
  }

  export type CategoriaUpsertWithoutSubcategoriasInput = {
    update: XOR<CategoriaUpdateWithoutSubcategoriasInput, CategoriaUncheckedUpdateWithoutSubcategoriasInput>
    create: XOR<CategoriaCreateWithoutSubcategoriasInput, CategoriaUncheckedCreateWithoutSubcategoriasInput>
    where?: CategoriaWhereInput
  }

  export type CategoriaUpdateToOneWithWhereWithoutSubcategoriasInput = {
    where?: CategoriaWhereInput
    data: XOR<CategoriaUpdateWithoutSubcategoriasInput, CategoriaUncheckedUpdateWithoutSubcategoriasInput>
  }

  export type CategoriaUpdateWithoutSubcategoriasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    historial?: HistorialAnaliticoUpdateManyWithoutCategoriaNestedInput
    productos?: ProductoUpdateManyWithoutCategoriaRelNestedInput
  }

  export type CategoriaUncheckedUpdateWithoutSubcategoriasInput = {
    id_categoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    historial?: HistorialAnaliticoUncheckedUpdateManyWithoutCategoriaNestedInput
    productos?: ProductoUncheckedUpdateManyWithoutCategoriaRelNestedInput
  }

  export type ComandasCreateManyMeseroInput = {
    id_comanda?: number
    id_mesa: number
    fecha_hora?: Date | string | null
    estado?: string
    token?: string | null
    fecha_pagado?: Date | string | null
    impuestos?: number
    pagado?: boolean
    sub_total?: number
    total?: number
    transaccion_id?: string | null
    metodo_pago?: string | null
  }

  export type ComandasUpdateWithoutMeseroInput = {
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    mesa?: MesaUpdateOneRequiredWithoutComandasNestedInput
    detalles?: DetalleComandaUpdateManyWithoutComandaNestedInput
  }

  export type ComandasUncheckedUpdateWithoutMeseroInput = {
    id_comanda?: IntFieldUpdateOperationsInput | number
    id_mesa?: IntFieldUpdateOperationsInput | number
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    detalles?: DetalleComandaUncheckedUpdateManyWithoutComandaNestedInput
  }

  export type ComandasUncheckedUpdateManyWithoutMeseroInput = {
    id_comanda?: IntFieldUpdateOperationsInput | number
    id_mesa?: IntFieldUpdateOperationsInput | number
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComandasCreateManyMesaInput = {
    id_comanda?: number
    id_mesero: number
    fecha_hora?: Date | string | null
    estado?: string
    token?: string | null
    fecha_pagado?: Date | string | null
    impuestos?: number
    pagado?: boolean
    sub_total?: number
    total?: number
    transaccion_id?: string | null
    metodo_pago?: string | null
  }

  export type ComandasUpdateWithoutMesaInput = {
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    mesero?: MeseroUpdateOneRequiredWithoutComandasNestedInput
    detalles?: DetalleComandaUpdateManyWithoutComandaNestedInput
  }

  export type ComandasUncheckedUpdateWithoutMesaInput = {
    id_comanda?: IntFieldUpdateOperationsInput | number
    id_mesero?: IntFieldUpdateOperationsInput | number
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    detalles?: DetalleComandaUncheckedUpdateManyWithoutComandaNestedInput
  }

  export type ComandasUncheckedUpdateManyWithoutMesaInput = {
    id_comanda?: IntFieldUpdateOperationsInput | number
    id_mesero?: IntFieldUpdateOperationsInput | number
    fecha_hora?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    token?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_pagado?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    impuestos?: FloatFieldUpdateOperationsInput | number
    pagado?: BoolFieldUpdateOperationsInput | boolean
    sub_total?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    transaccion_id?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DetalleComandaCreateManyProductoInput = {
    id_detalle?: number
    id_comanda: number
    cantidad?: number
    notas_especiales?: string | null
    status?: string
    hora?: number | null
  }

  export type HistorialAnaliticoCreateManyProductoInput = {
    id_historial?: number
    id_subcategoria: number
    id_categoria: number
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
  }

  export type ProductoAditamentosCreateManyProductoInput = {
    id_aditamento: number
  }

  export type ProductoImagenCreateManyProductoInput = {
    id_imagen?: number
    url: string
  }

  export type DetalleComandaUpdateWithoutProductoInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
    aditamentos?: ComandaAditamentosUpdateManyWithoutDetalleNestedInput
    comanda?: ComandasUpdateOneRequiredWithoutDetallesNestedInput
  }

  export type DetalleComandaUncheckedUpdateWithoutProductoInput = {
    id_detalle?: IntFieldUpdateOperationsInput | number
    id_comanda?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
    aditamentos?: ComandaAditamentosUncheckedUpdateManyWithoutDetalleNestedInput
  }

  export type DetalleComandaUncheckedUpdateManyWithoutProductoInput = {
    id_detalle?: IntFieldUpdateOperationsInput | number
    id_comanda?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type HistorialAnaliticoUpdateWithoutProductoInput = {
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoria?: CategoriaUpdateOneRequiredWithoutHistorialNestedInput
    subcategorias?: SubCategoriaUpdateOneRequiredWithoutHistorial_analiticoNestedInput
  }

  export type HistorialAnaliticoUncheckedUpdateWithoutProductoInput = {
    id_historial?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    id_categoria?: IntFieldUpdateOperationsInput | number
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HistorialAnaliticoUncheckedUpdateManyWithoutProductoInput = {
    id_historial?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    id_categoria?: IntFieldUpdateOperationsInput | number
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductoAditamentosUpdateWithoutProductoInput = {
    aditamento?: AditamentoUpdateOneRequiredWithoutProductosNestedInput
  }

  export type ProductoAditamentosUncheckedUpdateWithoutProductoInput = {
    id_aditamento?: IntFieldUpdateOperationsInput | number
  }

  export type ProductoAditamentosUncheckedUpdateManyWithoutProductoInput = {
    id_aditamento?: IntFieldUpdateOperationsInput | number
  }

  export type ProductoImagenUpdateWithoutProductoInput = {
    url?: StringFieldUpdateOperationsInput | string
  }

  export type ProductoImagenUncheckedUpdateWithoutProductoInput = {
    id_imagen?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
  }

  export type ProductoImagenUncheckedUpdateManyWithoutProductoInput = {
    id_imagen?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
  }

  export type ComandaAditamentosCreateManyAditamentoInput = {
    id_detalle: number
    confirmacion?: boolean
  }

  export type ProductoAditamentosCreateManyAditamentoInput = {
    id_producto: number
  }

  export type ComandaAditamentosUpdateWithoutAditamentoInput = {
    confirmacion?: BoolFieldUpdateOperationsInput | boolean
    detalle?: DetalleComandaUpdateOneRequiredWithoutAditamentosNestedInput
  }

  export type ComandaAditamentosUncheckedUpdateWithoutAditamentoInput = {
    id_detalle?: IntFieldUpdateOperationsInput | number
    confirmacion?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ComandaAditamentosUncheckedUpdateManyWithoutAditamentoInput = {
    id_detalle?: IntFieldUpdateOperationsInput | number
    confirmacion?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductoAditamentosUpdateWithoutAditamentoInput = {
    producto?: ProductoUpdateOneRequiredWithoutAditamentosNestedInput
  }

  export type ProductoAditamentosUncheckedUpdateWithoutAditamentoInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
  }

  export type ProductoAditamentosUncheckedUpdateManyWithoutAditamentoInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
  }

  export type DetalleComandaCreateManyComandaInput = {
    id_detalle?: number
    id_producto: number
    cantidad?: number
    notas_especiales?: string | null
    status?: string
    hora?: number | null
  }

  export type DetalleComandaUpdateWithoutComandaInput = {
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
    aditamentos?: ComandaAditamentosUpdateManyWithoutDetalleNestedInput
    producto?: ProductoUpdateOneRequiredWithoutDetallesNestedInput
  }

  export type DetalleComandaUncheckedUpdateWithoutComandaInput = {
    id_detalle?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
    aditamentos?: ComandaAditamentosUncheckedUpdateManyWithoutDetalleNestedInput
  }

  export type DetalleComandaUncheckedUpdateManyWithoutComandaInput = {
    id_detalle?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    cantidad?: IntFieldUpdateOperationsInput | number
    notas_especiales?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    hora?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ComandaAditamentosCreateManyDetalleInput = {
    id_aditamento: number
    confirmacion?: boolean
  }

  export type ComandaAditamentosUpdateWithoutDetalleInput = {
    confirmacion?: BoolFieldUpdateOperationsInput | boolean
    aditamento?: AditamentoUpdateOneRequiredWithoutComandasNestedInput
  }

  export type ComandaAditamentosUncheckedUpdateWithoutDetalleInput = {
    id_aditamento?: IntFieldUpdateOperationsInput | number
    confirmacion?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ComandaAditamentosUncheckedUpdateManyWithoutDetalleInput = {
    id_aditamento?: IntFieldUpdateOperationsInput | number
    confirmacion?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HistorialAnaliticoCreateManyCategoriaInput = {
    id_historial?: number
    id_producto: number
    id_subcategoria: number
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
  }

  export type ProductoCreateManyCategoriaRelInput = {
    id_producto?: number
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    id_subcategoria: number
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
  }

  export type SubCategoriaCreateManyCategoriaInput = {
    id_subcategoria?: number
    nombre: string
  }

  export type HistorialAnaliticoUpdateWithoutCategoriaInput = {
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    producto?: ProductoUpdateOneRequiredWithoutHistorialNestedInput
    subcategorias?: SubCategoriaUpdateOneRequiredWithoutHistorial_analiticoNestedInput
  }

  export type HistorialAnaliticoUncheckedUpdateWithoutCategoriaInput = {
    id_historial?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HistorialAnaliticoUncheckedUpdateManyWithoutCategoriaInput = {
    id_historial?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductoUpdateWithoutCategoriaRelInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUpdateManyWithoutProductoNestedInput
    historial?: HistorialAnaliticoUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUpdateManyWithoutProductoNestedInput
    subcategoria?: SubCategoriaUpdateOneRequiredWithoutProductosNestedInput
  }

  export type ProductoUncheckedUpdateWithoutCategoriaRelInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUncheckedUpdateManyWithoutProductoNestedInput
    historial?: HistorialAnaliticoUncheckedUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUncheckedUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateManyWithoutCategoriaRelInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubCategoriaUpdateWithoutCategoriaInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    historial_analitico?: HistorialAnaliticoUpdateManyWithoutSubcategoriasNestedInput
    productos?: ProductoUpdateManyWithoutSubcategoriaNestedInput
  }

  export type SubCategoriaUncheckedUpdateWithoutCategoriaInput = {
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    historial_analitico?: HistorialAnaliticoUncheckedUpdateManyWithoutSubcategoriasNestedInput
    productos?: ProductoUncheckedUpdateManyWithoutSubcategoriaNestedInput
  }

  export type SubCategoriaUncheckedUpdateManyWithoutCategoriaInput = {
    id_subcategoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type HistorialAnaliticoCreateManySubcategoriasInput = {
    id_historial?: number
    id_producto: number
    id_categoria: number
    hora: number
    dia_semana: number
    es_festivo?: boolean
    clima_id: number
    fecha_registro?: Date | string | null
  }

  export type ProductoCreateManySubcategoriaInput = {
    id_producto?: number
    nombre: string
    precio?: Decimal | DecimalJsLike | number | string
    id_categoria: number
    descripcion?: string | null
    tiempo_prep?: number
    pasos?: string | null
    activo?: boolean
    eliminado?: boolean
  }

  export type HistorialAnaliticoUpdateWithoutSubcategoriasInput = {
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoria?: CategoriaUpdateOneRequiredWithoutHistorialNestedInput
    producto?: ProductoUpdateOneRequiredWithoutHistorialNestedInput
  }

  export type HistorialAnaliticoUncheckedUpdateWithoutSubcategoriasInput = {
    id_historial?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    id_categoria?: IntFieldUpdateOperationsInput | number
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HistorialAnaliticoUncheckedUpdateManyWithoutSubcategoriasInput = {
    id_historial?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    id_categoria?: IntFieldUpdateOperationsInput | number
    hora?: IntFieldUpdateOperationsInput | number
    dia_semana?: IntFieldUpdateOperationsInput | number
    es_festivo?: BoolFieldUpdateOperationsInput | boolean
    clima_id?: IntFieldUpdateOperationsInput | number
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductoUpdateWithoutSubcategoriaInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUpdateManyWithoutProductoNestedInput
    historial?: HistorialAnaliticoUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUpdateManyWithoutProductoNestedInput
    categoriaRel?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
  }

  export type ProductoUncheckedUpdateWithoutSubcategoriaInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_categoria?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
    detalles?: DetalleComandaUncheckedUpdateManyWithoutProductoNestedInput
    historial?: HistorialAnaliticoUncheckedUpdateManyWithoutProductoNestedInput
    aditamentos?: ProductoAditamentosUncheckedUpdateManyWithoutProductoNestedInput
    imagen?: ProductoImagenUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateManyWithoutSubcategoriaInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_categoria?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    tiempo_prep?: IntFieldUpdateOperationsInput | number
    pasos?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    eliminado?: BoolFieldUpdateOperationsInput | boolean
  }



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