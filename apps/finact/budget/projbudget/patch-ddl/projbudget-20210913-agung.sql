


alter table `mst_projbudgetdet` add column if not exists `projbudgetdet_qty_prop` int(6) NOT NULL DEFAULT 0 after `projbudget_id`;
alter table `mst_projbudgetdet` add column if not exists `projbudgetdet_days_prop` int(6) NOT NULL DEFAULT 0 after `projbudgetdet_qty_prop`;
alter table `mst_projbudgetdet` add column if not exists `projbudgetdet_task_prop` int(6) NOT NULL DEFAULT 0 after `projbudgetdet_days_prop`;
alter table `mst_projbudgetdet` add column if not exists `projbudgetdet_rate_prop` decimal(14, 0) NOT NULL DEFAULT 0 after `projbudgetdet_task_prop`;
alter table `mst_projbudgetdet` add column if not exists `projbudgetdet_value_prop` decimal(14, 0) NOT NULL DEFAULT 0 after `projbudgetdet_rate_prop`;


