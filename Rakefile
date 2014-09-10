require 'rubygems'
require 'find'

task :required do
	puts "Checking GEMs required..."
    isOk = true
    begin
        require 'json'
    rescue LoadError
        puts "JSON gem not found.\nInstall it by running 'gem install json'"
        isOk = false
    end
    begin
        require 'closure-compiler'
    rescue LoadError
        puts "closure-compiler gem not found.\nInstall it by running 'gem install closure-compiler'"
        isOk = false
    end
    begin
        require 'zip/zip'
        require 'zip/zipfilesystem'
    rescue LoadError
        puts "Zip Tools not found.\nInstall it by running 'gem install rubyzip -v 0.9.9'"
        isOk = false
    end
    if !isOk
        abort
    end
    puts "DONE"
end

task :dir do
	puts "Preparing directories..."
    system "rm -rf build/"
    system "rm -rf dist/"
    Dir.mkdir('build') unless File.exists?('build')
    Dir.mkdir('build/js') unless File.exists?('build/js')
    Dir.mkdir('build/css') unless File.exists?('build/css')
    Dir.mkdir('build/img') unless File.exists?('build/img')
    Dir.mkdir('dist') unless File.exists?('dist')
    puts "DONE"
end

task :html => [:dir] do
	scriptSection = ''

    libraries = File.read "config/libraries.json"
    libraries = JSON.parse(libraries)
    libraries.each do |lib|
    	scriptSection += getScriptTag("js/" + lib);
    end
    scriptSection += "\n\t\t" + getScriptTag("js/" + getAppJSFileName());

    html = File.read 'src/index.html'
	while html['##APPNAME##'] do
        html['##APPNAME##'] = getAppName()
    end
    while html["##STYLE##"] do
    	html["##STYLE##"] = getStyleSheetTag("css/" + getAPPCSSFileName())
    end
    while html["##SCRIPT##"] do
    	html["##SCRIPT##"] = scriptSection
    end

    File.open('build/index.html', 'w+') do |file|
        file.write html
    end
end

task :js => [:dir] do
	system "rm -rf build/js"
	Dir.mkdir("build/js")
	libraries = File.read "config/libraries.json"
	libraries = JSON.parse(libraries)
    libraries.each do |lib|
    	system "cp lib/" + lib + " build/js/"
    end
    bufferFile = ''
    files = File.read "config/app.js"
    files = JSON.parse(files)
    files.each do |file|
    	bufferFile += File.read file
    	bufferFile += "\n"
    end
    jsFileName = getAppJSFileName()
    jsFile = File.open("build/js/" + jsFileName, "w+") do |file|
    	file.write bufferFile
    end
end

task :css => [:dir] do
    system "rm -rf build/css"
    Dir.mkdir("build/css")
    styles = File.read "config/style.json"
    styles = JSON.parse(styles)
    bufferFile = '';
    styles.each do |file|
        bufferFile += File.read file
        bufferFile += "\n"
    end
    jsFileName = getAPPCSSFileName()
    jsFile = File.open("build/css/" + jsFileName, "w+") do |file|
        file.write bufferFile
    end
end

task :assets => [:dir] do
	system "cp -r assets build/assets"
end

task :build do
	Rake::Task['required'].execute
	Rake::Task['dir'].execute
	Rake::Task['assets'].execute
	Rake::Task['html'].execute
	Rake::Task['js'].execute
    Rake::Task['css'].execute
end

task :default do
	Rake::Task['build'].execute
end

def getStyleSheetTag(styleFile)
	return "<link rel=\"stylesheet\" type=\"text/css\" href=\"#{styleFile}\"/>"
end

def getScriptTag(scriptFile)
	return "<script src=\"#{scriptFile}\"></script>"
end

def getAppName
    appname = File.read 'APP.txt'
    return appname
    exit
end

def getAppJSFileName
	return getAppName().strip.gsub(/\s/, "").downcase + ".js"
end

def getAPPCSSFileName
	return getAppName().strip.gsub(/\s/, "").downcase + ".css"
end