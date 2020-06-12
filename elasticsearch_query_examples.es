# uses REST-ful API commands and endpoints 
# GET, PUT, POST, DELETE, etc.

# create/insert/index a document 
# note: /{index_name}/_doc/{id_number}
# note: {id_number} is optional 
# note: "result" will be "created"
PUT /autos/_doc/101
{
    "make": "ford",
    "model": "escape"
}

PUT /autos/_doc/102
{
    "make": "ford",
    "model": "mustang",
    "color": "red",
    "location" : {
        "lat" : 34.234,
        "lon" : -14.345
    }
}

# create a different index and document 
PUT /emplyees/_doc/1
{
    "name" : "Chris R.",
    "age" : 43,
    "salary" : 90000
}

# view document (with metadata "_" fields)
# note: "found" will be true if exists
# note: "founds" will be false if it does not exist 
# note: can also use HEAD command to get HTML reponse code
GET /autos/_doc/101

# view document (no metadata)
GET /autos/_doc/101/_source

# update document fields
# note: "result" field will show "updated" if updated or "noop" it not updated
# note: documents are immutable, using get will wirte to all fields
POST /autos/_doc/101/_update
{
    "doc": {
        "model": "explorer",
        "color": "green"
    }
}

# delete a document
# note: "result" field will show "deleted"
DELETE /autos/_doc/101/

# delete index
# note: soft delete, removed from index instantly but not removed from disk
DELETE /autos/

# view index structure (mappings/settings)
# note: mappings include "properties" which are variable names and types
GET /autos/

# number of documents in index
GET /autos/_doc/_count

# view all documents in index, top 10 by default, use "size" for more
# results are in "hits" array
GET /autos/_search

GET /autos/_search
{
    "query" : { 
        "match_all" : {}
    }
} 

# search or query extract string - "term"
GET /autos/_search
{
    "query" : { 
        "term" : {
            "color" : "red"
        }
    }
} 

# create custom index structure
# note: allows dynamic mapping or adding of new fields 
# note: set "dynamic" to "false" to ignore other fields
# note set "dynamic" to "strict" to error
PUT /customers
{
    "mappings": {
        "properties": {
            "gender": {
                "type": "text",
                "analyzer": "standard"
            },
            "age": {
                "type": "integer"
            },
            "total_spent": {
                "type": "float"
            },
            "is_new": {
                "type": "boolean"
            },
            "name": {
                "type": "text",
                "analyzer": "standard"
            }
        }
    },
    "settings": {
        "number_of_shards": 2,
        "number_of_replicas": 1
    }
}

PUT /customers/_mapping
{
    "dynamic": "strict"
}

# test different analyzers
# note: simple, standard, whitespace, pattern, etc.
# reference: https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-analyzers.html
POST _analyze
{
    "analyzer" : "simple",
    "text" : "my name is david"
}

# example for upcoming search queries 
PUT /courses/_doc/1
{
    "name": "Accounting 101",
    "room": "E3",
    "professor": {
        "name": "Thomas Baszo",
        "department": "finance",
        "facutly_type": "part-time",
        "email": "baszot@onuni.com"
        },
    "students_enrolled": 27,
    "course_publish_date": "2015-01-19",
    "course_description": "Act 101 is a course from the business school on the introduction to accounting that teaches students how to read and compose basic financial statements"
}

PUT /courses/_doc/2
{
    "name": "Marketing 101",
    "room": "E4",
    "professor": {
        "name": "William Smith",
        "department": "finance",
        "facutly_type": "part-time",
        "email": "wills@onuni.com"
        },
    "students_enrolled": 18,
    "course_publish_date": "2015-06-21",
    "course_description": "Mkt 101 is a course from the business school on the introduction to marketing that teaches students the fundamentals of market analysis, customer retention and online advertisements"
}

PUT /courses/_doc/3
{
    "name": "Anthropology 230",
    "room": "G11",
    "professor": {
        "name": "Devin Cranford",
        "department": "history",
        "facutly_type": "full-time",
        "email": "devinc@onuni.com"
        },
    "students_enrolled": 22,
    "course_publish_date": "2013-08-27",
    "course_description": "Ant 230 is an intermediate course on human societies and cultures and their development. A focus on the Mayans civilization is rooted in this course"
}

PUT /courses/_doc/4
{
    "name": "Computer Science 101",
    "room": "C12",
    "professor": {
        "name": "Gregg Payne",
        "department": "engineering",
        "facutly_type": "full-time",
        "email": "payneg@onuni.com"
        },
    "students_enrolled": 33,
    "course_publish_date": "2013-08-27",
    "course_description": "CS 101 is a first year computer science introduction teaching fundamental data structures and alogirthms using python. "
}

PUT /courses/_doc/5
{
    "name": "Theatre 410",
    "room": "T18",
    "professor": {
        "name": "Sebastian Hern",
        "department": "art",
        "facutly_type": "part-time"
        },
    "students_enrolled": 47,
    "course_publish_date": "2013-01-27",
    "course_description": "Tht 410 is an advanced elective course disecting the various plays written by shakespere during the 16th century"
}

PUT /courses/_doc/6
{
    "name": "Cost Accounting 400",
    "room": "E7",
    "professor": {
        "name": "Bill Cage",
        "department": "accounting",
        "facutly_type": "full-time",
        "email": "cageb@onuni.com"
        },
    "students_enrolled": 31,
    "course_publish_date": "2014-12-31",
    "course_description": "Cst Act 400 is an advanced course from the business school taken by final year accounting majors that covers the subject of business incurred costs and how to record them in financial statements"
}

PUT /courses/_doc/7
{
    "name": "Computer Internals 250",
    "room": "C8",
    "professor": {
        "name": "Gregg Payne",
        "department": "engineering",
        "facutly_type": "part-time",
        "email": "payneg@onuni.com"
        },
    "students_enrolled": 33,
    "course_publish_date": "2012-08-20",
    "course_description": "cpt Int 250 gives students an integrated and rigorous picture of applied computer science, as it comes to play in the construction of a simple yet powerful computer system. "
}

PUT /courses/_doc/8
{
    "name": "Accounting Info Systems 350",
    "room": "E3",
    "professor": {
        "name": "Bill Cage",
        "department": "accounting",
        "facutly_type": "full-time",
        "email": "cageb@onuni.com"
        },
    "students_enrolled": 19,
    "course_publish_date": "2014-05-15",
    "course_description": "Act Sys 350 is an advanced course providing students a practical understanding of an accounting system in database technology. Students will use MS Access to build a transaction ledger system"
}

PUT /courses/_doc/9
{
    "name": "Tax Accounting 200",
    "room": "E7",
    "professor": {
        "name": "Thomas Baszo",
        "department": "finance",
        "facutly_type": "part-time",
        "email": "baszot@onuni.com"
        },
    "students_enrolled": 17,
    "course_publish_date": "2016-06-15",
    "course_description": "Tax Act 200 is an intermediate course covering various aspects of tax law"
}

PUT /courses/_doc/10
{
    "name": "Capital Markets 350",
    "room": "E3",
    "professor": {
        "name": "Thomas Baszo",
        "department": "finance",
        "facutly_type": "part-time",
        "email": "baszot@onuni.com"
        },
    "students_enrolled": 13,
    "course_publish_date": "2016-01-11",
    "course_description": "This is an advanced course teaching crucial topics related to raising capital and bonds, shares and other long-term equity and debt financial instrucments"
}

GET /courses/_search

# how to query (DSL)
# query context
# all documents in index - "match_all"
GET /courses/_search
{
    "query" : {
        "match_all" : {}
    }
}

# query a single field - "match"
GET /courses/_search
{
    "query": {
        "match": {
            "name": "computer"
        }
    }
}

# query if a field exists - "exists"
GET /courses/_search
{
    "query": {
        "exists": {
            "field": "professor.email"
        }
    }
}

# query multiple fields - "must"
GET /courses/_search
{
    "query": {
        "bool": {
            "must": [
                {"match": {"name": "computer"}},
                {"match": {"room": "c8"}}
            ]
        }
    }
}

# query multiple fields - "must_not" 
GET /courses/_search
{
    "query": {
        "bool": {
            "must": [
                {"match": {"name": "accounting"}},
                {"match": {"room": "e3"}}
            ],
            "must_not" : [
                {"match" : {"professor.name" : "bill"}}
            ]
        }
    }
}

# query multiple fields - "should"
# note: influences scoring 
GET /courses/_search
{
    "query": {
        "bool": {
            "must": [
                {"match": {"name": "accounting"}},
                {"match": {"room": "e3"}}
            ],
            "must_not" : [
                {"match" : {"professor.name" : "bill"}}
            ],
            "should" : [
                {"match" :  {"room" : "e7"}}
            ]
        }
    }
}

# query across multiple fields - "multi-match"
# note: can give more score importance via "^2" for field 
GET /courses/_search
{
    "query": {
        "multi_match" : {
            "fields" : ["name", "professor.department"],
            "query" : "accounting"
        }
    }
}

# query an entire string - "match-phrase"
# note: also "match_phrase_prefix" for start of string
GET /courses/_search
{
    "query": {
        "match_phrase": {
            "course_description" : "from the business school taken by final year"
        }
    }
}

# query for number range - "range"
# note: greater than or equal to (GTE), greater than (GT)
# note: also works with dates 
GET /courses/_search
{
    "query": {
        "range": {
            "students_enrolled": {
                "gte" : 10,
                "lte" : 30
            }
        }
    }
}

# filter context
# does not score documents 
# filters are cached, faster 
# can do everything inside filter: must, should, range, etc. 
GET /courses/_search
{
    "query": {
        "bool": {
            "filter": {
                "match": {
                    "name" : "accounting"
                }
            }
        }
    }
}

GET /courses/_search
{
    "query": {
        "bool": {
            "filter": {
                "bool" : {
                    "must" : [
                        {"match" : {"professor.name" : "bill"}},
                        {"match" : {"name" : "accounting"}}
                    ],
                    "must_not":[
                        {"match" : {"room" : "e7"}}
                    ]
                }
            }
        }
    }
}

# first "filter" context then "query" context 
GET /courses/_search
{
    "query": {
        "bool": {
            "filter": {
                "bool" : {
                    "must" : [
                        {"match" : {"professor.name" : "bill"}},
                        {"match" : {"name" : "accounting"}}
                    ],
                    "must_not":[
                        {"match" : {"room" : "e7"}}
                    ]
                }
            },
            "must" : [
                {"match" : {"room" :"e3"}}
            ]
        }
    }
}

# general structure 
POST _search
{
  "query": {
    "bool": {
      "must": [...],
      "filter": [...],
      "must_not": [...],
      "should": [...]
    }
  }
}

# bulk indexing 
# reference: https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html
POST /vehicles/_bulk
{ "index": {}}
{ "price" : 10000, "color" : "white", "make" : "honda", "sold" : "2016-10-28", "condition": "okay"}
{ "index": {}}
{ "price" : 20000, "color" : "white", "make" : "honda", "sold" : "2016-11-05", "condition": "new" }
{ "index": {}}
{ "price" : 30000, "color" : "green", "make" : "ford", "sold" : "2016-05-18", "condition": "new" }
{ "index": {}}
{ "price" : 15000, "color" : "blue", "make" : "toyota", "sold" : "2016-07-02", "condition": "good" }
{ "index": {}}
{ "price" : 12000, "color" : "green", "make" : "toyota", "sold" : "2016-08-19" , "condition": "good"}
{ "index": {}}
{ "price" : 18000, "color" : "red", "make" : "dodge", "sold" : "2016-11-05", "condition": "good"  }
{ "index": {}}
{ "price" : 80000, "color" : "red", "make" : "bmw", "sold" : "2016-01-01", "condition": "new"  }
{ "index": {}}
{ "price" : 25000, "color" : "blue", "make" : "ford", "sold" : "2016-08-22", "condition": "new"  }
{ "index": {}}
{ "price" : 10000, "color" : "gray", "make" : "dodge", "sold" : "2016-02-12", "condition": "okay" }
{ "index": {}}
{ "price" : 19000, "color" : "red", "make" : "dodge", "sold" : "2016-02-12", "condition": "good" }
{ "index": {}}
{ "price" : 20000, "color" : "red", "make" : "chevrolet", "sold" : "2016-08-15", "condition": "good" }
{ "index": {}}
{ "price" : 13000, "color" : "gray", "make" : "chevrolet", "sold" : "2016-11-20", "condition": "okay" }
{ "index": {}}
{ "price" : 12500, "color" : "gray", "make" : "dodge", "sold" : "2016-03-09", "condition": "okay" }
{ "index": {}}
{ "price" : 35000, "color" : "red", "make" : "dodge", "sold" : "2016-04-10", "condition": "new" }
{ "index": {}}
{ "price" : 28000, "color" : "blue", "make" : "chevrolet", "sold" : "2016-08-15", "condition": "new" }
{ "index": {}}
{ "price" : 30000, "color" : "gray", "make" : "bmw", "sold" : "2016-11-20", "condition": "good" }

# query top x documents - "size"
# note: index of first document to show - "from"
# note: sort by field - "sort"
GET /vehicles/_search
{
    "from": 0,
    "size" : 3,
    "query" : {
        "match_all" : {}
    },
    "sort" : [
        {"price" : {"order" : "desc"}}
    ]
}

# aggregation functions 
# count - "_count" endpoint 
GET /vehicles/_count
{
    "query" : {
        "match" : {"make" : "dodge"}
    }
}

# query and then apply aggregate function on results 
# note: aggs include avg, min, max, stats, etc. 
# note: can also do date rangesd
GET /vehicles/_search
{
    "query" : {
        "match" : {"color" : "red"}
    },

    "aggs" : {
        "popular_cars" : {
            "terms" : { 
                "field" : "make.keyword"
            },
            "aggs" : {
                "avg_price" : {
                    "avg" : {
                        "field" : "price"
                    }
                },
                "max_price" : {
                    "max" : {
                        "field" : "price"
                    }
                },
                "min_price" : {
                    "min" : {
                        "field" : "price"
                    }
                }
            }
        }
    }
}

GET /vehicles/_search
{
    "query" : {
        "match" : {"color" : "red"}
    },

    "aggs" : {
        "popular_cars" : {
            "terms" : { 
                "field" : "make.keyword"
            },
            "aggs" : {
                "stats_on_price" : {
                    "stats" : {
                        "field" : "price"
                    }
                }
            }
        }
    }
}

# nested aggregations 
GET /vehicles/_search
{
    "query" : {
        "match" : {"color" : "red"}
    },

    "aggs" : {
        "car_condition" : {
            "terms" : { 
                "field" : "condition.keyword"
            },
            "aggs" : {
                "avg_price" : {
                    "avg" : {
                        "field" : "price"
                    }
                },
                "make": {
                    "terms" : {
                        "field" : "make.keyword"
                    },
                    "aggs" : {
                        "min_price" : {"min" : {"field" : "price"}},
                        "max_price" : {"max" : {"field" : "price"}}
                    }
                }
            }
        }
    }
}
