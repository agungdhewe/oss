var prog = 'settl';


var post = `
function btn_post_click() {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}

	var ${prog}_id = obj.txt_${prog}_id.textbox('getText');
	$ui.ShowMessage("[QUESTION]Apakah anda yakin akan posting '" + ${prog}_id + "' ?", {
		"OK": async () => {
			$ui.mask('wait..');
			var { Post } = await import('./${prog}.xtion-post.mjs');
			Post(${prog}_id, (err, success) => {
				if (success) {
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ ${prog}_ispost: 1 }, form.rowid);
					$ui.ShowMessage("[INFO]Jurnal '" + ${prog}_id + "' telah berhasil di posting");
					btn_post.linkbutton('disable');
					btn_unpost.linkbutton('enable');
					obj.chk_${prog}_ispost.checkbox('check');
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({${prog}_ispost:1}, form.rowid)
					form.commit();
				}
			});
		},
		"Cancel": () => {
		}
	});

}
`;

var unpost = `
function btn_unpost_click() {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}

	var ${prog}_id = obj.txt_${prog}_id.textbox('getText');
	$ui.ShowMessage("[QUESTION]Apakah anda yakin akan unpost '" + ${prog}_id + "' ?", {
		"OK": async () => {
			$ui.mask('wait..');
			var { UnPost } = await import('./${prog}.xtion-unpost.mjs');
			UnPost(${prog}_id, (err, success) => {
				if (success) {
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ ${prog}_ispost: 1 }, form.rowid);
					btn_post.linkbutton('enable');
					btn_unpost.linkbutton('disable');
					obj.chk_${prog}_ispost.checkbox('check');
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({${prog}_ispost:0}, form.rowid)
					form.commit();
				}
			});
		},
		"Cancel": () => {
		}
	});

}



`


console.log(unpost)