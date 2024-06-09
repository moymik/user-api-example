import pg from "pg";
const Pool = pg.Pool;
// Setup the PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user-db-example",
  password: "123456",//fill
  port: 5432,
});

const createDatabase = async () => {
    const client = await pool.connect();
    try {
      // Check if the users table exists
      const tableExists = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'users'
        );
      `);
  
      if (!tableExists.rows[0].exists) {
        // Create users table
        await client.query(`
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            age INTEGER
          );
        `);
        console.log("Users table created successfully.");
      } else {
        console.log("Users table already exists.");
      }
    } catch (err) {
      console.error("Error creating database: ", err);
    } finally {
      client.release();
    }
  };

createDatabase();
const data = {
  getUsers: async () => {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM users");
      return result.rows;
    } finally {
      client.release();
    }
  },
  addUser: async (user) => {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *",
        [user.name, user.age]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  },
  updateUser: async (id, updatedData) => {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "UPDATE users SET name = $1, age = $2 WHERE id = $3 RETURNING *",
        [updatedData.name, updatedData.age, id]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  },
  deleteUser: async (id) => {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rowCount > 0;
    } finally {
      client.release();
    }
  },
  getUserById: async (id) => {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  },
};
export default data;