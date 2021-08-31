require './constants'

desc 'サイトを手元でホストする'
task :host do
  sh 'budo -d docs'
end

desc '地図のスタイルファイルを作成する'
task :style do
  sh <<-EOS
curl #{BASE_STYLE_URL} |
ruby style.rb > docs/style.json
  EOS
end

