import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, DialogActions } from "@mui/material";

const Times = ({ open, handleClose, theBestTimes }) => {
	const sortedTimes = theBestTimes
		.slice()
		.sort((a, b) => a - b)
		.slice(0, 3);
	const ranking = sortedTimes.map((time, index) => <li key={index}>{time}</li>);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
			className='dialog-window'>
			<DialogTitle id='alert-dialog-title' className='dialog-title'>
				<h4 className='title-h3'>The Best Times</h4>
			</DialogTitle>
			<DialogContent>
				<div className='ranking'>
					<ol className='ranking-list'>
						{ranking.length < 1 ? "No times" : ranking}
					</ol>
				</div>
			</DialogContent>
			<DialogActions>
				<button onClick={handleClose} className='button-close'>
					Close
				</button>
			</DialogActions>
		</Dialog>
	);
};

export default Times;
