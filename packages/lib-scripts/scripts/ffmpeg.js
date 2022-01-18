const ffmpeg = require('ffmpeg');

// 目标源
const source = '../../../dist/v_xunren.mp4';
const source2 = '../../../dist/v_wennuan.mp4';
// 输出源
const dist = '../../../dist/v_xunren_output.mp4';
const distDir = '../../../dist';

// 转码视频源
// try {
// 	var process = new ffmpeg(source);
// 	process.then(function (video) {
//     video
//     .setVideoStartTime(1)
// 		.setVideoSize('750x640', true, true)
// 		.save(dist, function (error, file) {
// 			if (!error) {
// 				console.log('Video file: ' + file);
//       } else {
// 				console.log('error: ' + error);
//       }
// 		});
// 	}, function (err) {
// 		console.log('Error: ' + err);
// 	});
// } catch (e) {
// 	console.log(e.code);
// 	console.log(e.msg);
// }

// // 
try {
	var process = new ffmpeg(source2);
	process.then(function (video) {
		// Callback mode
		video.fnExtractFrameToJPG(distDir, {
			frame_rate : 1,
			number : 1,
			file_name : 'wennuan_%t_%s'
		}, function (error, files) {
			if (!error)
				console.log('Frames: ' + files);
		});
	}, function (err) {
		console.log('Error: ' + err);
	});
} catch (e) {
	console.log(e.code);
	console.log(e.msg);
}
