import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

//
export const users = pgTable("users", {
  id: text("id").primaryKey(), //clerkId
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  productId: uuid("product_id")
    .references(() => products.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//  Relations define how tables connect to each other . this enables Drizzle 's query api
//  to automatically join related data when using with : {relationName:true}

// Users Relations : a user can have many product and can have many comments
//  many() mean one user can have multiple records

export const userRelations = relations(users, ({ many }) => ({
  products: many(products), // One user => many products
  comments: many(comments), // One user => many comments
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  comments: many(comments),
  //  field  : the foreign key column in This Table products.userId
  // references : the primary key column in the related Table users.id
  user: one(users, { fields: [products.userId], references: [users.id] }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  products: one(products, {
    fields: [comments.productId],
    references: [products.id],
  }),
  user: one(users, { fields: [comments.userId], references: [users.id] }),
}));

//  type Inference

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
