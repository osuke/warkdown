# warkdown

A cli tool for generating markdown files by using WP REST API  

## Installation
```
npm i -g warkdown
```

## Usage
```
Options:
  -v, --version     output the version number
  -e, --entry <s>   specify the entrypoint of your WP REST API
  -o, --output <s>  specify the location of directory where the md files will be generated (default: "docs")
  -h, --help        output usage information
```
### Examples
```
warkdown -e https://example.com/wp-json/wp/v2/posts/
```
```
warkdown -e https://example.com/wp-json/wp/v2/posts/ -o dist
```

## License
MIT