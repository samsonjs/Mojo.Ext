#!/usr/bin/env ruby

require 'rubygems'
require 'json'
require 'fileutils'

def inject
  FileUtils.cp_r(mojo_ext_path, target_mojo_ext_path)

  mojo_ext_source_dict = {'source' => 'mojo-ext/ext.js'}
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
  FileUtils.mv(sources_file, File.join(project_path, 'sources.json-backup'))
  File.open(sources_file, 'w') {|f| f.puts(sources.to_json)}
  `./prettyprint.py "#{sources_file}" "#{sources_file}"`
end

def project_path
  ARGV.first || Dir.pwd
end

def main
  unless File.exists?(sources_file)
    raise "no Mojo project found at #{project_path}"
  end
  
  if extended?
    puts "project already contains Mojo.Ext, bailing"
  else
    inject
    puts "injected Mojo.Ext"
  end
end

def mojo_ext_path
  File.expand_path(File.join('..', 'src'), __FILE__)
end

def target_mojo_ext_path
  File.join(project_path, 'mojo-ext')
end

if $0 == __FILE__
  main
end
