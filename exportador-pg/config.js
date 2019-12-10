module.exports = {
    user?: string, // default process.env.PGUSER || process.env.USER
    password?: string, //default process.env.PGPASSWORD
    database?: string, // default process.env.PGDATABASE || process.env.USER
    port?: number, // default process.env.PGPORT
    connectionString?: string, // e.g. postgres://user:password@host:5432/database
    ssl?: any, // passed directly to node.TLSSocket
    types?: any, // custom type parsers
    statement_timeout?: number, // number of milliseconds before a statement in query will time out, default is no timeout
    query_timeout?: number, // number of milliseconds before a query call will timeout, default is no timeout
}