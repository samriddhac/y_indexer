# -*- coding: utf-8 -*-
import scrapy


class WikibookbotoopSpider(scrapy.Spider):
    name = 'wikibookbotoop'
    allowed_domains = ['en.wikibooks.org/wiki/Object_Oriented_Programming']
    start_urls = ['https://en.wikibooks.org/wiki/Object_Oriented_Programming']

    def parse(self, response):
        print('Starting parse operation')
        texts = response.xpath('//p/text()').extract()
        print('Text ',texts)
        with open('output.txt', 'w', encoding='utf8') as f:
            f.write(texts);

