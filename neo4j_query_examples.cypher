// Neo4j Cypher Query Language 

// create nodes
CREATE (n:Employee {Name:'Eric', Surname:'Lee', Gender:'M'});
CREATE (n:Employee {Name:'John', Surname:'Smith', Gender:'M'});

// create nodes-relationships
CREATE (e:Employee {Name:'Eric'})-[:WORK_IN]->(c:Company {Name:'Silicon Cloud International'})
CREATE (s:Skill {Name:'Neo4j'})<-[:KNOWS]-(e:Employee {Name:'Eric'})-[:WORK_IN]->(c:Company {Name:'Silicon Valley Consultants'})

// delete nodes
MATCH (n:Employee {Surname:'Lee'}) DELETE n;

// query nodes
MATCH (n:Employee) RETURN n;
MATCH (n:Employee) RETURN n LIMIT 25

// query node properties 
MATCH (n:Employee) RETURN n.Gender;
MATCH (n:Employee) RETURN n.Gender, n.Name;

// query properties alias
MATCH (n:Employee) RETURN n.Gender AS Gender, n.Name as Name;

// query and subset nodes
MATCH (n:Employee) WHERE n.Name = 'Eric' RETURN n;
MATCH (n:Employee) WHERE n.Name STARTS WITH 'Er' RETURN n;

// query relationships 
MATCH (e:Employee)-[:KNOWS]->(s:Skill) RETURN e.Name, s.Name;
MATCH (e:Employee)-[r:KNOWS]->(s:Skill) RETURN *;
MATCH (n:Employee)-[r]-(c:Company) RETURN n,r,c;
MATCH (e:Employee)-[r]->(s:Skill) RETURN *;
MATCH (e:Employee)-[r]->(s:Skill) RETURN type(r);

// delete all
MATCH (n)-[r]-(q) DELETE n,r,q;