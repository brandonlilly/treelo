# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.(@board, :id, :title)
json.lists @board.lists do |json, list|
  json.(list, :id, :title, :board_id, :ord, :created_at, :updated_at)
  json.cards list.cards
end
