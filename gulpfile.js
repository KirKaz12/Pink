var gulp         = require('gulp'),
	
    less         = require('gulp-less'),
    
    //Плагины для предотварищения обрыва watch при ошибке
    plumber      = require('gulp-plumber'), 
    gutil        = require('gulp-util'), 

    // Подключаем пакет для минификации CSS
    cssnano      = require('gulp-cssnano'), 
    
    // Подключаем gulp-uglifyjs (для сжатия JS)
    uglify       = require('gulp-uglifyjs'), 
    
    // Подключаем библиотеку для переименования файлов
    rename       = require('gulp-rename'),

    // Подключаем библиотеку для автоматического добавления префиксов 
    autoprefixer = require('gulp-autoprefixer'),
    
    //Минификатор html
    htmlmin      = require('gulp-htmlmin'),
	
    browserSync  = require('browser-sync'),

    jade         = require('gulp-jade'),

    // Подключаем gulp-concat (для конкатенации файлов)
    concat       = require('gulp-concat'), 
    
    // Подключаем библиотеки для работы с изображениями
    pngquant     = require('imagemin-pngquant'), 
    imagemin     = require('gulp-imagemin');

//=========== Tasks
// Jade
gulp.task('jade', function() {
    return gulp.src(['app/jade/index.jade',
                    'app/jade/photos.jade',
                    'app/jade/challenge.jade'])
	    .pipe(plumber(function (error) {
                gutil.log(error.message); //Продолжаем watch после ошибки
                this.emit('end');
        }))
        .pipe(jade({pretty: true})) 
        .pipe(gulp.dest('app')) 
});
//Перезагрузка после изменения  .jade
gulp.task('jade-watch', ['jade'], browserSync.reload);

//Минифицируем html
gulp.task('htmlminify', function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'));
});

// Создаем таск Less
gulp.task('less', function() { 
	return gulp.src('app/less/style.less')
        .pipe(plumber(function (error) {
                gutil.log(error.message); //Продолжаем watch после ошибки
                this.emit('end');
        }))
		.pipe(less())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
		.pipe(gulp.dest('app/css/')) 
		.pipe(browserSync.reload({stream: true}))
});

// CSS соединение и сжатие
gulp.task('cssconcat', function() {
    return gulp.src('app/css/style.css')
        .pipe(rename('main.min.css')) 
        .pipe(cssnano()) 
        .pipe(gulp.dest('dist/css')); 
});

// JS минификация
gulp.task('jsminify', function() {
    return gulp.src('app/js/common.js') 
        .pipe(uglify()) 
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('dist/js'));
});

//Сжатие библиотек
gulp.task('libminify', function() {
    return gulp.src([
        'app/libs/jquery-2.2.1.min.js',
        'app/libs/slick.min.js'
        ]) 
        .pipe(concat('libs.min.js')) 
        .pipe(uglify()) 
        .pipe(gulp.dest('dist/js'));
});

// Минификация изображений
gulp.task('imgmin', function() { 
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(imagemin({ // Сжимаем их с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img')); 
});

// Создаем таск browser-sync
gulp.task('browser-sync', function() { 
    browserSync({
       proxy: 'pink.sl' //Домен OpenServer
       // или baseDir: 'app' // Директория для сервера - app
    });
});

//Набюлдаем за изменениями файлов
gulp.task('watch', ['browser-sync', 'imgmin', 'htmlminify', 'jsminify', 'jade', 'less'], function() {
    gulp.watch('app/**/*.less', ['less']);
    gulp.watch('./app/**/*.jade', ['jade-watch']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch('app/*.php').on('change', browserSync.reload); 
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload); 
});

// Вызываем gulp по дефолту
gulp.task('default', ['watch']);