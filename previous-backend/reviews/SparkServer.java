package reviews;
import org.bson.types.ObjectId;
import java.util.*;

import com.mongodb.client.model.Filters;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import static spark.Spark.*;
import spark.Request;
import spark.Response;
import spark.Route;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import com.mongodb.client.result.*;

public class SparkServer {
	private static MongoCollection<Document> collection;
	private static MongoClient client;
	private static MongoCollection<Document> resource;
	private static MongoCollection<Document> contents;
	private static MongoCollection<Document> locations;

	private static MongoDatabase databaseContent;

	public static void main(String[] args) {
		init();

		options("/*", (request, response) -> {
			String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
			if (accessControlRequestHeaders != null) {
				response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
			}

			String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
			if (accessControlRequestMethod != null) {
				response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
			}

			return "OK";
		});

		before((request, response) -> {
			response.header("Access-Control-Allow-Origin", "*");
		});

		get("/getReview", new Route() {
			@Override
			public List<String> handle(Request request, Response response) throws Exception {
				String courseCode = request.queryParams("courseCode");
				Document query = new Document("course", courseCode).append("reviewed", true);
				List<Document> documents = collection.find(query).into(new ArrayList<>());
				List<String> jsonDocuments = new ArrayList<>();
				for (Document document : documents) {
					jsonDocuments.add(document.toJson());
				}
				return jsonDocuments;
			}
		});

		post("/proveComment", new Route() {
			@Override
			public Object handle(Request request, Response response) throws Exception {
				String id = request.queryParams("id");
				Document filter = new Document("_id", new ObjectId(id));
				Document update = new Document("$set", new Document("reviewed", true));

				UpdateResult result = collection.updateOne(filter, update);

				if (result.getModifiedCount() > 0) {
					return "Document updated successfully";
				} else {
					return "No document was updated";
				}
			}
		});

		post("/deleteComment", new Route() {
			@Override
			public Object handle(Request request, Response response) throws Exception {
				String id = request.queryParams("id");
				ObjectId idToDelete = new ObjectId(id);
				Document filter = new Document("_id", idToDelete);
				DeleteResult result = collection.deleteOne(filter);
				if (result.getDeletedCount() == 1) {
					return null;
				} else {
					return null;
				}
			}
		});

		get("/content-moderation", new Route() {
			@Override
			public List<String> handle(Request request, Response response) throws Exception {
				Document query = new Document("reviewed", false);
				List<Document> documents = collection.find(query).into(new ArrayList<>());
				List<String> jsonDocuments = new ArrayList<>();
				for (Document document : documents) {
					jsonDocuments.add(document.toJson());
				}
				return jsonDocuments;
			}
		});

		get("/findLocation", new Route() {
			@Override
			public List<String> handle(Request request, Response response) throws Exception {
				String types = request.queryParams("types");
				System.out.println(types);
				String[] places = types.split(",");
				System.out.println("Places: " + Arrays.toString(places));
				List<Document> documents = locations.find(Filters.in("type", places)).into(new ArrayList<>());
				List<String> jsonDocuments = new ArrayList<>();
				for (Document document : documents) {
					jsonDocuments.add(document.toJson());
				}
				return jsonDocuments;
			}
		});
	
		get("/resources", new Route() {
			@Override
			public List<String> handle(Request request, Response response) throws Exception {
				String type = request.queryParams("resource");
				Document query = new Document("type", type);
				List<Document> documents = resource.find(query).into(new ArrayList<>());
				List<String> jsonDocuments = new ArrayList<>();
				for (Document document : documents) {
					System.out.println("This is the document: " + document.toJson());
					jsonDocuments.add(document.toJson());
				}
				return jsonDocuments;
			}
		});

		get("/newStudent", new Route() {
			@Override
			public List<String> handle(Request request, Response response) throws Exception {
				String type = request.queryParams("resource");
				Document query = new Document("group", type);
				List<Document> documents = contents.find(query).into(new ArrayList<>());
				List<String> jsonDocuments = new ArrayList<>();
				for (Document document : documents) {
					jsonDocuments.add(document.toJson());
				}
				return jsonDocuments;
			}
		});


		get("/newStudent/major", new Route() {
			@Override
			public List<String> handle(Request request, Response response) throws Exception {
				String type = request.queryParams("resource");
				Document query = (type.equals("popular")) ? new Document("popular", true) : new Document("group", type);
				List<Document> documents = contents.find(query).into(new ArrayList<>());
				List<String> jsonDocuments = new ArrayList<>();
				for (Document document : documents) {
					jsonDocuments.add(document.toJson());
				}
				return jsonDocuments;
			}
		});

		get("/test", new Route() {
			@Override
			public String handle(Request request, Response response) throws Exception {
				return "testing successful!";
			}
		});

		post("/addComment", new Route() {
			@Override
			public Object handle(Request request, Response response) throws Exception {
				try {
					System.out.println("enter the add comment");
					Gson gson = new Gson();
					String requestBody = request.body();
					JsonObject json = gson.fromJson(requestBody, JsonObject.class);
					String instructor = json.get("instructor").toString();
					String quarter = json.get("quarter").toString();
					String course = json.get("course").toString();
					String comment = json.get("comment").toString();
					boolean reviewed = json.get("reviewed").getAsBoolean();
					String review = "{\"instructor\" : " + instructor + ", \"quarter\" : " + quarter + ", \"course\" : " + course + ", \"comment\" : " + comment + ", \"reviewed\" : " + reviewed + "}";
					Document doc = Document.parse(review);
					collection.insertOne(doc);
					return "comment uploaded";
				} catch (Exception error) {
					System.out.print(error);
					return error;
				}
			}
		});

		post("/update", new Route() {
			@Override
			public Object handle(Request request, Response response) throws Exception {
				try {
					Document filter = new Document();
					List<Document> documents = collection.find().into(new ArrayList<>());
					Document update = new Document("$set", new Document("reviewed", true));
					UpdateResult result = collection.updateMany(filter, update);
					return "comment uploaded";
				} catch (Exception error) {
					System.out.print(error);
					return error;
				}
			}
		});

		post("/addResource", new Route() {
			@Override
			public Object handle(Request request, Response response) throws Exception {
				try {
					Gson gson = new Gson();
					String requestBody = request.body();
					JsonObject json = gson.fromJson(requestBody, JsonObject.class);
					String title = json.get("title").toString();
					String content = json.get("text").toString();
					String link = json.get("link").toString();
					String group = json.get("group").toString();
					String web = json.get("web").toString();

					String information = "{title: " + title + ",group: " + group + ",content: " + content + ",image: " + link + ",link:" + web + "}";
					Document doc = Document.parse(information);
					contents.insertOne(doc);
					return "Resource Uploaded";
				} catch (Exception error) {
					System.out.print(error);
					return error;
				}
			}
		});
	}

	private static void init() {
		String port = System.getenv("PORT");
		if (port == null || port.isEmpty()) {
			port = "4567";
		}
		port(Integer.parseInt(port));
		ConnectionString connString = new ConnectionString("mongodb+srv://uwise:universityofwashington@uwise.vsv8lb2.mongodb.net/test?retryWrites=true&w=majority");
		MongoClientSettings settings = MongoClientSettings.builder()
				.applyConnectionString(connString)
				.build();
		client = MongoClients.create(settings);
		MongoDatabase databaseReview = client.getDatabase("review");
		MongoDatabase databaseResource = client.getDatabase("resources");
		MongoDatabase databaseNewStudent = client.getDatabase("new_student");
		MongoDatabase databaseLocations = client.getDatabase("locations");
		databaseLocations.getCollection("databaseLocations");
		databaseContent = client.getDatabase("resources");
		locations = databaseLocations.getCollection("locations");
		resource = databaseResource.getCollection("resource");
		collection = databaseReview.getCollection("comments");
		contents = databaseNewStudent.getCollection("contents");
		Runtime.getRuntime().addShutdownHook(new Thread() {
			public void run() {
				client.close();
			}
		});
	}
}