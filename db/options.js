export const sqlite = {
    client: "sqlite3",
    connection: {
        filename: "./db/sqlite/mensajes.sqlite"
    },
    useNullAsDefault: true
}

export const mariadb = {
    client: "mysql",
    connection: {
        host: process.env.URI || "127.0.0.1",
        port: process.env.PORT_DB || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "",
        database: process.env.DB_NAME || "coderhouse"
    }
}



    
