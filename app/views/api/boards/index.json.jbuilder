json.array! @boards do |board|
  json.(board, :id, :title)
  json.lists board.lists do |json, list|
    json.(list, :id, :title, :board_id, :ord, :created_at, :updated_at)
    json.cards list.cards
  end
end
