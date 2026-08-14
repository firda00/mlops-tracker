import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:postgres@localhost:5432/cs_ml_hub"
)

# Handle engine creation with graceful fallback to SQLite for local development
try:
    if DATABASE_URL.startswith("postgresql"):
        engine = create_engine(DATABASE_URL, pool_pre_ping=True)
        IS_POSTGRES = True
    else:
        engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
        IS_POSTGRES = False
except Exception as e:
    print(f"[Database] Warning: Failed to connect to PostgreSQL ({e}). Falling back to SQLite.")
    DATABASE_URL = "sqlite:///./cs_ml_hub.db"
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
    IS_POSTGRES = False

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def init_db():
    """Lifespan database initialization: creates vector extension and database tables."""
    global IS_POSTGRES
    if IS_POSTGRES:
        try:
            with engine.connect() as conn:
                conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
                conn.commit()
                print("[Database] Installed pgvector extension successfully.")
        except Exception as e:
            print(f"[Database] Could not initialize pgvector extension: {e}")
            
    try:
        from models import Base
        Base.metadata.create_all(bind=engine)
        print("[Database] Created database tables successfully.")
    except Exception as e:
        print(f"[Database] Error creating database tables: {e}")

def get_db():
    """FastAPI DB session dependency."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
