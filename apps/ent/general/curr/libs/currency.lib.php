<?php namespace FGTA4\libs\ent\general\curr;

class Currency {


	public static function getCurrentRate($db, $curr_id) {
		if ($curr_id==__LOCAL_CURR) {
			return 1;
		}

		$stmt = $db->prepare("
			select currrate_value 
			from mst_currrate 
			where curr_id=:curr_id
			order by currrate_date desc
			limit 1
		");
		$stmt->execute([
			':curr_id' => $curr_id
		]);
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		if (count($rows)) {
			return $rows[0]['currrate_value'];
		} else {
			return 1;
		}
	}
}
