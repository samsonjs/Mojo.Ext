#!/usr/bin/env ruby

require 'pathname'
require 'rubygems'
require 'json'
require 'fileutils'
require 'stringio'

def inject
  FileUtils.cp_r(mojo_ext_path, target_mojo_ext_path)

  mojo_ext_source_dict = {'source' => File.join('mojo-ext', 'ext.js')}
  unless sources.first == mojo_ext_source_dict
    sources.unshift(mojo_ext_source_dict)
    save_sources!
  end
end

def extended?
  File.exists?(File.join(project_path, 'mojo-ext'))
end

def sources
  $sources ||= JSON.parse(File.read(sources_file))
end

def sources_file
  File.join(project_path, 'sources.json')
end

def save_sources!
  # capture pretty-print output to string
  pretty_json = StringIO.new
  orig_stdout = $stdout
  $stdout = pretty_json
  jj sources
  $stdout = orig_stdout
  pretty_json.rewind()
  FileUtils.mv(sources_file, File.join(project_path, 'sources.json-backup'))
  File.open(sources_file, 'w') {|f| f.puts(pretty_json.read)}
end

def project_path
  ARGV.first || Dir.pwd
end

def usage
  puts "Usage: #{File.basename(__FILE__)} <path-to-mojo-project>"
end

def main
  unless File.exists?(sources_file)
    puts "[error] No Mojo project found at #{project_path}"
    usage
    exit(1)
  end
  
  if extended?
    # TODO ask if the user wants to update/replace Mojo.Ext instead
    puts "project already contains Mojo.Ext, bailing"
  else
    inject
    puts "injected Mojo.Ext"
  end
end

def mojo_ext_path
  this_file = __FILE__
  path = File.expand_path(File.join('..', 'src'), Pathname.new(this_file).realpath)
end

def target_mojo_ext_path
  File.join(project_path, 'mojo-ext')
end

if $0 == __FILE__
  main
end
