import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Pool, QueryResult, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool;
  private isConnected = false;

  async onModuleInit() {
    this.pool = new Pool({
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      user: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'realntoffice',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    try {
      const client = await this.pool.connect();
      this.isConnected = true;
      client.release();
      this.logger.log('PostgreSQL database pool connected successfully');
    } catch (err: any) {
      this.logger.warn(`PostgreSQL connection failed (${err.message}). Falling back to decoupled operational mode.`);
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
    }
  }

  async query<T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    if (!this.isConnected) {
      return {
        rows: [],
        rowCount: 0,
        command: 'FALLBACK',
        oid: 0,
        fields: [],
      };
    }
    return this.pool.query<T>(text, params);
  }

  get connected(): boolean {
    return this.isConnected;
  }
}
