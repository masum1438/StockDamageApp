# StockDamageApp
# Stock Damage Management System

A web-based Stock Damage Management System built using **ASP.NET Core MVC**, **Entity Framework Core**, **SQL Server**, and **Bootstrap 5**. This system allows users to record, manage, and track stock damage entries efficiently with real-time calculations, multi-currency support, and employee tracking.

---



## Features
<img width="1262" height="598" alt="img1" src="https://github.com/user-attachments/assets/56e7357f-4378-458a-af28-3890da081a28" />


- Add, edit, and delete stock damage entries  
- Auto-calculation of **Amount** and **Total Amount** in BDT  
- Multi-currency support with conversion rates  
- Track damaged items by **Warehouse**, **Item**, and **Employee**  
- Responsive, clean user interface using Bootstrap 5  
- AJAX-based dynamic table updates  
- Save all entries to SQL Server database  
- Custom client-side validation with alerts  
<img width="1362" height="620" alt="popup" src="https://github.com/user-attachments/assets/d02cdf21-ac5c-4ec3-b65f-9c41d6aac7eb" />


---
## database feature

### `StockDamage` Table
<img width="1361" height="558" alt="img2" src="https://github.com/user-attachments/assets/de1b8ad5-818a-41cc-bcd4-8aaef200c173" />
### `Godown` Table
<img width="1309" height="536" alt="godown" src="https://github.com/user-attachments/assets/41d9cf17-de7f-48e3-9ac2-03f34d612e58" />
### `Stock` Table
<img width="1317" height="529" alt="stock" src="https://github.com/user-attachments/assets/6a00a825-b507-4b85-b1e4-18419a37fbc4" />
### `SubItem` Table
<img width="1320" height="578" alt="subitemcode" src="https://github.com/user-attachments/assets/5b0a88ec-adf4-472f-8e7c-bb71f40373da" />
### `Employee` Table
<img width="1289" height="555" alt="employee" src="https://github.com/user-attachments/assets/af60adfa-5c86-4ee1-8ba9-87434044d755" />
### `Currency` Table
<img width="1352" height="527" alt="currency" src="https://github.com/user-attachments/assets/6f7dc6e6-ae51-42fa-a1d8-12886f10456b" />
### `StoredProcedures` Table
<img width="1183" height="586" alt="stock-damage-list" src="https://github.com/user-attachments/assets/3afcb6af-2594-4d89-97d7-21ca011acbbc" />

<img width="1344" height="593" alt="stock-damage-save" src="https://github.com/user-attachments/assets/09941435-21d6-49a0-8f55-7165523189f0" />


---
## Technologies Used

- **Frontend:** HTML, CSS, Bootstrap 5, jQuery  
- **Backend:** ASP.NET Core MVC, C#  
- **Database:** SQL Server, Entity Framework Core (Code First / Database First)  
- **Other:** AJAX, JSON, Anti-forgery token protection  

---

## Database

The project uses **SQL Server** as the backend. Example table structures:

### `StockDamage` Table

| Column             | Type         | Description                        |
|-------------------|-------------|-----------------------------------|
| Id                | INT          | Primary key                        |
| DamageDate        | DATE         | Date of stock damage               |
| WarehouseName     | NVARCHAR     | Name of warehouse                  |
| ItemName          | NVARCHAR     | Name of item                       |
| ItemCode          | NVARCHAR     | Item code                           |
| BatchNo           | NVARCHAR     | Batch number                        |
| Quantity          | DECIMAL      | Quantity of damaged items           |
| Rate              | DECIMAL      | Rate per item                       |
| AmountBDT         | DECIMAL      | Amount in BDT                       |
| ConversionRate    | DECIMAL      | Currency conversion rate            |
| EmployeeName      | NVARCHAR     | Employee responsible                |
| Comments          | NVARCHAR     | Remarks                              |
| CreatedAt         | DATETIME     | Entry creation timestamp            |

---


