# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170512181951) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "album_associations", force: :cascade do |t|
    t.integer  "album_id",                        null: false
    t.integer  "artist_id",                       null: false
    t.boolean  "featured_artist", default: false, null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.index ["album_id"], name: "index_album_associations_on_album_id", using: :btree
    t.index ["artist_id"], name: "index_album_associations_on_artist_id", using: :btree
  end

  create_table "album_likes", force: :cascade do |t|
    t.integer  "user_id",                null: false
    t.integer  "album_id",               null: false
    t.integer  "like",       default: 1, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["album_id"], name: "index_album_likes_on_album_id", using: :btree
    t.index ["user_id"], name: "index_album_likes_on_user_id", using: :btree
  end

  create_table "album_urls", force: :cascade do |t|
    t.integer  "album_id",   null: false
    t.string   "service",    null: false
    t.string   "url",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["album_id"], name: "index_album_urls_on_album_id", using: :btree
  end

  create_table "albums", force: :cascade do |t|
    t.string   "name",                                   null: false
    t.string   "image_url",  default: "./tape-icon.png"
    t.integer  "year"
    t.string   "kind",                                   null: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
  end

  create_table "artists", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.string   "name",                        null: false
    t.string   "description"
    t.boolean  "private",     default: false, null: false
    t.integer  "creator_id",                  null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "user_groups", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "group_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_user_groups_on_group_id", using: :btree
    t.index ["user_id"], name: "index_user_groups_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",                   default: "",                null: false
    t.string   "handle",                 default: "",                null: false
    t.string   "email",                  default: "",                null: false
    t.string   "encrypted_password",     default: "",                null: false
    t.string   "image",                  default: "./tape-icon.png"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,                 null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.string   "provider"
    t.string   "uid"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["handle"], name: "index_users_on_handle", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
