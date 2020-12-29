<?php
include_once "./model.php";
class TagView extends TagModel {

	/**
	 * Get all the tags that belong to a single ticket
	 */
	public function show_single_tag(string $ticket_id) {
		$results = parent::get_single_ticket($ticket_id);
		$num_of_rows = $results->rowCount();

		/**
		 * Check if there are any tags
		 */
		if ($num_of_rows <= 0) {
			echo json_encode(array(
				"message" => "None found"
			));
			exit;
		}

		/**
		 * Create array of tag-items 
		 */
		$tags_array = array();
		while ($row = $results->fetch(PDO::FETCH_ASSOC)) {
			extract($row);
			$tag_item = array(
				"id" => $id,
				"tag" => $tag,
				"ticketId" => $ticket_id
			);
			array_push($tags_array, $tag_item);
		}
		
		/**
		 * Display successfull message
		 */
		echo json_encode(array(
			"count" => $num_of_rows,
			"success" => true,
			"data" => $tags_array
		));
		exit;
	}

	/**
	 * Create a tag
	 */
	public function add_tag(string $ticket_id, string $tag) {
		$results = parent::post_tag($ticket_id, $tag);
		if (!$results) return false;
		else return true;
	}

	/**
	 * Delete a tag
	 */
	public function remove_tag(string $ticket_id, int $id) {
		$results = parent::delete_tag($ticket_id, $id);
		if (!$results) return false;
		else return true;
	}

}