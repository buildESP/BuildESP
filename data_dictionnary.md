# Documentation: Data Dictionary and Table Schema

## Introduction

- The data dictionary will use **snake_case** naming convention and **English language**.
- The fields `created_at`, `updated_at`, and `deleted_at` are managed by Sequelize and are not explicitly defined below (but are present in each entity).
- SQL table names will be **plural**. For example, `Users` refers to the SQL table, whereas `User` refers to the entity in the code.

---

## Table: `Users`

Relative to users of the application.

| **Attribute** | **Type**      | **Description**                   |
|---------------|---------------|-----------------------------------|
| `id`          | INT (PK)      | Unique ID                         |
| `firstname`   | VARCHAR(50)   | First name of the user            |
| `lastname`    | VARCHAR(50)   | Last name of the user             |
| `email`       | VARCHAR(100)  | Unique email (used for login)     |
| `password`    | VARCHAR(255)  | Hashed password (e.g., bcrypt)    |
| `address`     | VARCHAR(255)  | User’s address                    |
| `postcode`    | VARCHAR(10)   | User’s postcode                   |
| `phone`       | VARCHAR(15)   | User’s phone number               |
| `rating`      | FLOAT         | Average rating (related to `User_rates`) |
| `picture`     | VARCHAR(255)  | URL pointing to user’s picture    |
| `is_admin`    | BOOLEAN       | Whether the user is an admin      |

---

## Table: `User_rates`

Relative to ratings given to users.

| **Attribute** | **Type**      | **Description**                   |
|---------------|---------------|-----------------------------------|
| `id`          | INT (PK)      | Unique ID                         |
| `user_id`     | INT (FK)      | ID of the graded user             |
| `grader_id`   | INT (FK)      | ID of the grading user            |
| `grade`       | INT           | Grade given                       |
| `comment`     | VARCHAR(50)   | Additional comment (optional)     |

---

## Table: `Items`

Relative to items.

| **Attribute** | **Type**      | **Description**                   |
|---------------|---------------|-----------------------------------|
| `id`          | INT (PK)      | Unique ID                         |
| `user_id`     | INT (FK)      | Belongs to a user                 |
| `name`        | VARCHAR(100)  | Name of the item                  |
| `description` | TEXT          | Detailed description              |
| `subcategory_id` | INT (FK)   | Belongs to a subcategory          |
| `picture`     | VARCHAR(255)  | URL pointing to item’s picture    |
| `status`      | ENUM          | Item status: available, rented, not available |

---

## Table: `Categories`

Relates to item categories. A category contains subcategories.

| **Attribute** | **Type**      | **Description**                   |
|---------------|---------------|-----------------------------------|
| `id`          | INT (PK)      | ID of the category                |
| `name`        | VARCHAR(100)  | Name of the category              |
| `subcategories` | ARRAY       | Contains subcategories            |

---

## Table: `Subcategories`

Relates to item subcategories. A subcategory contains items.

| **Attribute** | **Type**      | **Description**                   |
|---------------|---------------|-----------------------------------|
| `id`          | INT (PK)      | ID of the subcategory             |
| `category_id` | INT (FK)      | Belongs to a category             |
| `name`        | VARCHAR(100)  | Name of the subcategory           |

---

## Table: `Exchanges`

Relates to exchanges between lenders and borrowers.

| **Attribute**    | **Type**      | **Description**                  |
|------------------|---------------|----------------------------------|
| `id`             | INT (PK)      | Unique ID                        |
| `item_id`        | INT (FK)      | Belongs to an item               |
| `lender_user_id` | INT (FK)      | ID of the lender user            |
| `borrow_user_id` | INT (FK)      | ID of the borrowing user         |
| `start_date`     | DATETIME      | Start date and time              |
| `end_date`       | DATETIME      | End date and time                |
| `status`         | ENUM          | Rental status: Pending, Approved, Completed, Cancelled |

---

## Table: `Advices`

Relates to advice left after borrowing.

| **Attribute** | **Type**      | **Description**                   |
|---------------|---------------|-----------------------------------|
| `id`          | INT (PK)      | Unique ID                         |
| `exchange_id` | INT (FK)      | Related to one exchange           |
| `user_id`     | INT (FK)      | ID of the user                    |
| `grade`       | INT           | Grade given                       |
| `comment`     | TEXT          | Comment given by the user         |

---

## Table: `Messages`

Relates to messages sent between users.

| **Attribute**    | **Type**      | **Description**                  |
|------------------|---------------|----------------------------------|
| `id`             | INT (PK)      | Unique ID                        |
| `sender_user_id` | INT (FK)      | ID of the sender user            |
| `receiver_user_id` | INT (FK)    | ID of the receiver user          |
| `content`        | TEXT          | Message content                  |

---

## Table: `Groups`

Relates to groups to which users can be assigned.

| **Attribute** | **Type**      | **Description**                   |
|---------------|---------------|-----------------------------------|
| `id`          | INT (PK)      | Unique ID                         |
| `name`        | VARCHAR(100)  | Name of the group                 |
| `description` | TEXT          | Description of the group          |
| `group_admin` | INT (FK)      | ID of the admin user              |

---

## Table: `Relations_user_group`

Defines the relationship between users and groups.

| **Attribute** | **Type**      | **Description**                   |
|---------------|---------------|-----------------------------------|
| `id`          | INT (PK)      | Unique ID                         |
| `user_id`     | INT (FK)      | ID of the user                    |
| `group_id`    | INT (FK)      | ID of the group                   |

---

## Table: `Relations_item_group`

Defines the relationship between items and groups.

| **Attribute** | **Type**      | **Description**                   |
|---------------|---------------|-----------------------------------|
| `id`          | INT (PK)      | Unique ID                         |
| `item_id`     | INT (FK)      | ID of the item                    |
| `group_id`    | INT (FK)      | ID of the group                   |
