create database jwero_db;
use jwero_db;
DROP TABLE  orders;
CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255),
  category ENUM('Gold','Silver','Diamond'),
  quantity INT,
  price DECIMAL(15,2),
  order_date DATE,
  PRIMARY KEY (id)
);
INSERT INTO orders VALUES
(1,'Classic Gold Chain 22k','Gold',2,85000.00,'2025-12-01'),
(2,'Solitaire Diamond Ring','Diamond',1,150000.00,'2025-12-02'),
(3,'Sterling Silver Anklets','Silver',10,2500.00,'2025-12-04'),
(4,'Gold Wedding Band','Gold',3,45000.00,'2025-12-05'),
(5,'Diamond Tennis Bracelet','Diamond',1,320000.00,'2025-12-08'),
(6,'Silver Pooja Set','Silver',2,12000.00,'2025-12-10'),
(7,'Gold Mangalsutra','Gold',1,95000.00,'2025-12-12'),
(8,'Diamond Stud Earrings','Diamond',2,55000.00,'2025-12-15'),
(9,'Silver Designer Ring','Silver',15,1800.00,'2025-12-18'),
(10,'Gold Coins (10g)','Gold',5,78000.00,'2025-12-20'),
(11,'Diamond Nose Pin','Diamond',4,12000.00,'2025-12-22'),
(12,'Silver Chain with Pendant','Silver',8,4500.00,'2025-12-24'),
(13,'Heavy Gold Kada','Gold',1,160000.00,'2025-12-26'),
(14,'Princess Cut Diamond Ring','Diamond',1,210000.00,'2025-12-28'),
(15,'Silver Bracelet','Silver',5,3500.00,'2025-12-30'),
(16,'Bridal Diamond Necklace','Diamond',1,550000.00,'2026-01-01'),
(17,'Gold Bangle Set','Gold',2,125000.00,'2026-01-01'),
(18,'Simple Silver Band','Silver',20,1200.00,'2026-01-02'),
(19,'Diamond Halo Earrings','Diamond',1,85000.00,'2026-01-02'),
(20,'Mens Gold Ring','Gold',3,55000.00,'2026-01-03'),
(21,'Silver Gift Coin (5g)','Silver',10,5000.00,'2026-01-03'),
(22,'Rose Gold Diamond Pendant','Diamond',2,45000.00,'2026-01-03'),
(23,'24k Gold Biscuits (100g)','Gold',1,785000.00,'2026-01-04'),
(24,'Silver Kammarband','Silver',2,18000.00,'2026-01-04'),
(25,'Emerald Diamond Ring','Diamond',1,175000.00,'2026-01-04'),
(26,'Lightweight Gold Earrings','Gold',5,15000.00,'2026-01-05'),
(27,'Silver Cufflinks','Silver',6,3200.00,'2026-01-05'),
(28,'Daily Wear Gold Chain','Gold',4,35000.00,'2026-01-05'),
(29,'Blue Sapphire Diamond Ring','Diamond',1,290000.00,'2026-01-05'),
(30,'Antique Silver Necklace','Silver',3,22000.00,'2026-01-05');

select * from orders;