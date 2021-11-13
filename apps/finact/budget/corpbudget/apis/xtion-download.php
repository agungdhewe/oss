<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/rootdir/phpoffice_phpspreadsheet_1.13.0.0/vendor/autoload.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\debug;
use \PhpOffice\PhpSpreadsheet\Spreadsheet;
use \PhpOffice\PhpSpreadsheet\Writer\Xlsx;


$API = new class extends corpbudgetBase {
	
	public function download($corpbudget_id) {

		$downloadfilename = "corporatebudget-$corpbudget_id.xlsx";

		$spreadsheet = new Spreadsheet();
		$sheet = $spreadsheet->getActiveSheet();



		$sheet->setCellValue('A1', 'Corporate Budget');
		$sheet->setCellValue('A2', $corpbudget_id);
		
		$this->write_dataheader($sheet);

		$sql = "
			select 
			mc.accbudget_id,
			ma.accbudget_name,
			mc.corpbudgetdet_01,
			mc.corpbudgetdet_02,
			mc.corpbudgetdet_03,
			mc.corpbudgetdet_04,
			mc.corpbudgetdet_05,
			mc.corpbudgetdet_06,
			mc.corpbudgetdet_07,
			mc.corpbudgetdet_08,
			mc.corpbudgetdet_09,
			mc.corpbudgetdet_10,
			mc.corpbudgetdet_11,
			mc.corpbudgetdet_12,
			mc.corpbudgetdet_total
			from 
			mst_corpbudgetdet mc inner join mst_accbudget ma on ma.accbudget_id = mc.accbudget_id 
			WHERE 
			mc.corpbudget_id = :corpbudget_id
			order BY mc.accbudget_id 		
		";


		debug::log("do query...");
		$stmt = $this->db->prepare($sql); 
		$stmt->execute([
			':corpbudget_id' => $corpbudget_id
		]);
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		debug::log("result: ". count($rows) . " rows");


		$no = 1;
		$i = 5;
		foreach ($rows as $row) {
			$sheet->setCellValue("A$i", $no);
			$sheet->setCellValue("B$i", $row['accbudget_id']);
			$sheet->setCellValue("C$i", $row['accbudget_name']);

			$sheet->setCellValue("D$i", $row['corpbudgetdet_01']);
			$sheet->setCellValue("E$i", $row['corpbudgetdet_02']);
			$sheet->setCellValue("F$i", $row['corpbudgetdet_03']);
			$sheet->setCellValue("G$i", $row['corpbudgetdet_04']);
			$sheet->setCellValue("H$i", $row['corpbudgetdet_05']);
			$sheet->setCellValue("I$i", $row['corpbudgetdet_06']);
			$sheet->setCellValue("J$i", $row['corpbudgetdet_07']);
			$sheet->setCellValue("K$i", $row['corpbudgetdet_08']);
			$sheet->setCellValue("L$i", $row['corpbudgetdet_09']);
			$sheet->setCellValue("M$i", $row['corpbudgetdet_10']);
			$sheet->setCellValue("N$i", $row['corpbudgetdet_11']);
			$sheet->setCellValue("O$i", $row['corpbudgetdet_12']);
			$sheet->setCellValue("P$i", "=SUM(D$i:O$i)");

			$no++;
			$i++;
		}	



		$tempfile = __LOCALDB_DIR . '/output/temp-'.uniqid().'.xlsx';
		$writer = new Xlsx($spreadsheet);

		debug::log("write to temp file: $tempfile");
		$writer->save($tempfile);

		header('Content-Description: File Transfer');
		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment; filename="'.$downloadfilename.'"');
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($tempfile));
		
		debug::log("write tempfile to output");
		$fp = fopen($tempfile, "r");
		$output = fread($fp, filesize($tempfile));

		debug::log("removing temp file.");
		unlink($tempfile);
		return $output;
	}



	public function write_dataheader($sheet) {
		$sheet->setCellValue('A4', 'No');
		$sheet->setCellValue('B4', 'Account');
		$sheet->setCellValue('C4', 'AccountName');
		$sheet->setCellValue('D4', 'JAN');
		$sheet->setCellValue('E4', 'FEB');
		$sheet->setCellValue('F4', 'MAR');
		$sheet->setCellValue('G4', 'APR');
		$sheet->setCellValue('H4', 'MEI');
		$sheet->setCellValue('I4', 'JUN');
		$sheet->setCellValue('J4', 'JUL');
		$sheet->setCellValue('K4', 'AGS');
		$sheet->setCellValue('L4', 'SEP');
		$sheet->setCellValue('M4', 'OKT');
		$sheet->setCellValue('N4', 'NOV');
		$sheet->setCellValue('O4', 'DES');
		$sheet->setCellValue('P4', 'TOTAL');
		
		
	}

};

